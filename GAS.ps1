# ================================
# KONFIGURACE
# ================================
$projectPath = "C:\Users\micha\Documents\MiKa\GAS"
$deploymentId = "AKfycbwqbsd4MeHjmQOPNoaYhsbCpQjiSF6Ki2nBWAGgyoOK"

# jistota pro clasp v PATH
$env:Path += ";C:\Users\micha\AppData\Roaming\npm"

# ================================
# DOTAZ NA NÁZEV DEPLOYMENTU
# ================================
$deploymentDescription = Read-Host "Zadej název / popis deploymentu"

if (-not $deploymentDescription) {
    $deploymentDescription = "Auto deploy"
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
Write-Host "Nahrávám do GAS..." -ForegroundColor Cyan

clasp push

if ($LASTEXITCODE -ne 0) {
    Write-Host "Chyba při nahrávání." -ForegroundColor Red
    exit
}

# ================================
# DEPLOY (S NÁZVEM)
# ================================
Write-Host "Aktualizuji deployment..." -ForegroundColor Cyan

$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$fullDescription = "$deploymentDescription - $timestamp"

clasp deploy -i $deploymentId -d "$fullDescription"

if ($LASTEXITCODE -ne 0) {
    Write-Host "Deployment selhal." -ForegroundColor Red
    exit
}

# ================================
# GIT
# ================================
Write-Host "Commituji do GitHubu..." -ForegroundColor Cyan

$commitMessage = "Auto deploy GAS - $fullDescription"

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
# TAG
# ================================
$version = Get-Date -Format "yyyyMMdd-HHmm"

git tag "release-$version"
git push origin "release-$version"

# ================================
# HOTOVO
# ================================
Write-Host "Deploy dokončen." -ForegroundColor Green

Pause