$files = Get-ChildItem -Path "d:\One_Nation\src" -Recurse -Filter "*.jsx"
foreach ($f in $files) {
    if ($f.FullName -match "assets") { continue }
    $content = Get-Content $f.FullName -Raw
    
    $newContent = $content -replace 'text-primary(?![-\w])', 'text-white' `
                          -replace 'dark:text-accent(?![-\w])', 'dark:text-white' `
                          -replace 'text-accent(?![-\w])', 'text-white' `
                          -replace 'text-primary-dark(?![-\w])', 'text-white' `
                          -replace 'dark:text-primary-dark(?![-\w])', 'dark:text-white' `
                          -replace 'group-hover:text-primary(?![-\w])', 'group-hover:text-white' `
                          -replace 'dark:group-hover:text-accent(?![-\w])', 'dark:group-hover:text-white' `
                          -replace 'bg-primary/10', 'bg-white/10' `
                          -replace 'dark:bg-accent/15', 'dark:bg-white/10' `
                          -replace 'dark:bg-accent/10', 'dark:bg-white/10' `
                          -replace 'border-primary/10', 'border-white/10' `
                          -replace 'dark:border-accent/15', 'dark:border-white/10' `
                          -replace 'text-primary/10', 'text-white/10' `
                          -replace 'dark:text-accent/15', 'dark:text-white/10' `
                          -replace 'bg-primary/20', 'bg-white/20' `
                          -replace 'dark:bg-primary/20', 'dark:bg-white/20' `
                          -replace 'text-accent-dark(?![-\w])', 'text-white' `
                          -replace 'bg-accent/10', 'bg-white/10' `
                          -replace 'bg-primary-glow', 'bg-white/5' `
                          -replace 'dark:bg-accent-glow', 'dark:bg-white/5'

    if ($content -cne $newContent) {
        Set-Content -Path $f.FullName -Value $newContent -Encoding UTF8
        Write-Host "Updated $($f.FullName)"
    }
}
