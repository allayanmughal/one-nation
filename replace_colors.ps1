$files = Get-ChildItem -Path "d:\One_Nation\src" -Recurse -Filter "*.jsx"
foreach ($f in $files) {
    if ($f.FullName -match "assets") { continue }
    $content = Get-Content $f.FullName -Raw
    $newContent = $content -replace 'bg-white', 'bg-primary-dark' `
                          -replace 'bg-gray-50', 'bg-primary' `
                          -replace 'bg-gray-100', 'bg-primary-light' `
                          -replace 'bg-gray-200', 'bg-primary-light' `
                          -replace 'text-gray-900', 'text-white' `
                          -replace 'text-gray-800', 'text-white' `
                          -replace 'text-gray-700', 'text-white' `
                          -replace 'text-gray-600', 'text-white/80' `
                          -replace 'text-gray-500', 'text-white/70' `
                          -replace 'text-gray-400', 'text-white/60' `
                          -replace 'text-gray-300', 'text-white/50' `
                          -replace 'border-gray-100', 'border-white/10' `
                          -replace 'border-gray-200', 'border-white/20'
    if ($content -cne $newContent) {
        Set-Content -Path $f.FullName -Value $newContent -Encoding UTF8
        Write-Host "Updated $($f.FullName)"
    }
}
