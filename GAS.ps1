# Zeptá se na název projektu
$projectName = Read-Host "Zadej název projektu (složky)"

if (-not $projectName) {
    Write-Host "Název projektu je povinný." -ForegroundColor Red
    exit
}

# Zeptá se na scriptId
$scriptId = Read-Host "Zadej scriptId z Apps Script URL"

if (-not $scriptId) {
    Write-Host "scriptId je povinné." -ForegroundColor Red
    exit
}

# Vytvoření složky
New-Item -ItemType Directory -Path $projectName -Force | Out-Null
Set-Location $projectName

# Clasp clone
Write-Host "Clonuji projekt..." -ForegroundColor Cyan
npx clasp clone $scriptId

# Inicializace Git (volitelné)
$initGit = Read-Host "Chceš inicializovat Git? (y/n)"

if ($initGit -eq "y") {
    git init
    git add .
    git commit -m "Initial GAS import"
    Write-Host "Git inicializován." -ForegroundColor Green
}

Write-Host "Hotovo." -ForegroundColor Green