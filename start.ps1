$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $projectRoot 'backend'
$url = 'http://localhost:3000'
$healthUrl = "$url/api/health"
$port = 3000

$existingProcess = Get-NetTCPConnection -LocalPort $port -State Listen -ErrorAction SilentlyContinue |
  Select-Object -First 1 -ExpandProperty OwningProcess

if (-not $existingProcess) {
  Start-Process -FilePath 'node' -ArgumentList 'src/server.js' -WorkingDirectory $backendDir | Out-Null

  $started = $false
  for ($attempt = 0; $attempt -lt 10; $attempt++) {
    Start-Sleep -Milliseconds 500

    try {
      Invoke-WebRequest -UseBasicParsing $healthUrl | Out-Null
      $started = $true
      break
    } catch {
    }
  }

  if (-not $started) {
    Write-Error "No pude iniciar el servidor en $url"
    exit 1
  }
}

Start-Process $url
Write-Host "Portal disponible en $url"
