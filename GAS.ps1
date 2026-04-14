# ================================
# KONFIGURACE
# ================================
$projectPath = "C:\Users\micha\Documents\MiKa\GAS"
$deploymentId = "AKfycbwqbsd4MeHjmQOPNoaYhsbCpQjiSF6Ki2nBWAGgyoOK"

# ================================
# PŘECHOD DO PROJEKTU
# ================================
Set-Location -Path $projectPath

# ================================
# KONTROLA CLASP
# ================================
if (-not (Get-Command clasp -ErrorAction SilentlyContinue)) {
    Write-Host "clasp není dostupný." -ForegroundColor Red
    exit
}

# ================================
# UPLOAD DO GOOGLE APPS SCRIPT
# ================================
Write-Host "Nahrávám do Google Apps Script..." -ForegroundColor Cyan

clasp push

if ($LASTEXITCODE -ne 0) {
    Write-Host "Chyba při nahrávání do GAS." -ForegroundColor Red
    exit
}

# ================================
# DEPLOY (PŘEPSÁNÍ EXISTUJÍCÍ IMPLEMENTACE)
# ================================
Write-Host "Aktualizuji deployment..." -ForegroundColor Cyan

clasp deploy -i $deploymentId

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment selhal." -ForegroundColor Red
    exit
}

# ================================
# GIT AUTOMATIZACE
# ================================
Write-Host "Commituji do GitHubu..." -ForegroundColor Cyan

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto deploy GAS - $timestamp"

git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git add selhal." -ForegroundColor Red
    exit
}

git commit -m "$commitMessage"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git commit: žádné změny." -ForegroundColor Yellow
}

git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git push selhal." -ForegroundColor Red
    exit
}

# ================================
# TAG (RELEASE)
# ================================
$version = Get-Date -Format "yyyyMMdd-HHmm"

git tag "release-$version"
git push origin "release-$version"

# ================================
# HOTOVO
# ================================
Write-Host "Deploy dokončen (GAS + GitHub + přepsaná implementace)." -ForegroundColor Green

Pause