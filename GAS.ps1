# Přechod do projektu
$projectPath = "C:\Users\micha\Documents\MiKa\GAS"
Set-Location -Path $projectPath

# kontrola clasp
if (-not (Get-Command clasp -ErrorAction SilentlyContinue)) {
    Write-Host "clasp není dostupný." -ForegroundColor Red
    exit
}

# upload do Google Apps Script
Write-Host "Nahrávám do Google Apps Script..." -ForegroundColor Cyan
clasp push

if ($LASTEXITCODE -ne 0) {
    Write-Host "Chyba při nahrávání do GAS." -ForegroundColor Red
    exit
}

# Git automatizace
Write-Host "Commituji do GitHubu..." -ForegroundColor Cyan

# zpráva commitu
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto deploy GAS - $timestamp"

git add .

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git add selhal." -ForegroundColor Red
    exit
}

git commit -m "$commitMessage"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git commit selhal (možná žádné změny)." -ForegroundColor Yellow
}

git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host "Git push selhal." -ForegroundColor Red
    exit
}

# volitelný tag = "nová implementace"
$version = Get-Date -Format "yyyyMMdd-HHmm"

git tag "release-$version"
git push origin "release-$version"

Write-Host "Deploy dokončen (GAS + GitHub + release tag)." -ForegroundColor Green

Pause