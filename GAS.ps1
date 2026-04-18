# ================================
# KONFIGURACE
# ================================
$projectPath = "C:\Users\micha\Documents\MiKa\GAS"
$deploymentId = "AKfycbzVOUktuX5TszgPJBnNi4ONvDS3okQKwNjXkZhpYkXfxXEep7U5mtnHdMir0dP5o1viaA"

# jistota pro clasp v PATH
$env:Path += ";C:\Users\micha\AppData\Roaming\npm"

# ================================
# DOTAZ NA POPIS
# ================================
$deploymentDescription = Read-Host "Zadej název / popis změny"

if (-not $deploymentDescription) {
    $deploymentDescription = "Auto update"
}

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
# UPLOAD DO GAS
# ================================
Write-Host "Nahrávám změny do GAS..." -ForegroundColor Cyan

clasp push

if ($LASTEXITCODE -ne 0) {
    Write-Host "Chyba při nahrávání." -ForegroundColor Red
    exit
}

# ================================
# DEPLOY (BEZ NOVÉ VERZE)
# ================================
Write-Host "Aktualizuji deployment (HEAD)..." -ForegroundColor Cyan

clasp deploy --deploymentId $deploymentId --versionNumber HEAD --description "$deploymentDescription"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deploy selhal." -ForegroundColor Red
    exit
}

# ================================
# GIT
# ================================
Write-Host "Commituji do GitHubu..." -ForegroundColor Cyan

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$fullDescription = "$deploymentDescription - $timestamp"
$commitMessage = "GAS update - $fullDescription"

git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git add selhal." -ForegroundColor Red
    exit
}

git commit -m "$commitMessage"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Žádné změny ke commitu." -ForegroundColor Yellow
}

git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git push selhal." -ForegroundColor Red
    exit
}

# ================================
# TAG
# ================================
$version = Get-Date -Format "yyyyMMdd-HHmm"

git tag "release-$version"
git push origin "release-$version"

# ================================
# URL VÝSTUP
# ================================
$webAppUrl = "https://script.google.com/macros/s/$deploymentId/exec"

Write-Host ""
Write-Host "================================" -ForegroundColor DarkGray
Write-Host "DEPLOYMENT URL:" -ForegroundColor Green
Write-Host $webAppUrl -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor DarkGray
Write-Host ""

# ================================
# HOTOVO
# ================================
Write-Host "Dokončeno." -ForegroundColor Green

Pause