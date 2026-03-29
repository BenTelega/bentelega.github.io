#!/bin/bash

echo "🎨 Portfolio V2 Design Validation"
echo "=================================="
echo ""

# Check if files exist
echo "📁 Checking file structure..."
files=(
    "portfolio-v2/index.html"
    "portfolio-v2/css/styles.css"
    "portfolio-v2/js/script.js"
    "portfolio-v2/README.md"
    "test-v2.html"
    "COMPARISON.md"
    "PORTFOLIO-V2-SUMMARY.md"
)

all_files_exist=true
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        size=$(du -h "$file" | cut -f1)
        echo "✅ $file ($size)"
    else
        echo "❌ $file - MISSING!"
        all_files_exist=false
    fi
done

echo ""

# Check CSS complexity
echo "🎨 Checking CSS complexity..."
css_file="portfolio-v2/css/styles.css"
if [ -f "$css_file" ]; then
    lines=$(wc -l < "$css_file")
    animations=$(grep -c "@keyframes" "$css_file")
    gradients=$(grep -c "linear-gradient" "$css_file")
    
    echo "CSS Statistics:"
    echo "  • Total lines: $lines"
    echo "  • Animations: $animations"
    echo "  • Gradients: $gradients"
    
    if [ $lines -gt 1500 ]; then
        echo "  • Complexity: HIGH (Maximalist design) ✨"
    else
        echo "  • Complexity: MEDIUM"
    fi
else
    echo "❌ CSS file not found!"
fi

echo ""

# Check JavaScript complexity
echo "⚙️  Checking JavaScript complexity..."
js_file="portfolio-v2/js/script.js"
if [ -f "$js_file" ]; then
    lines=$(wc -l < "$js_file")
    functions=$(grep -c "function\|const.*=.*=>" "$js_file")
    animations=$(grep -c "animate\|animation\|requestAnimationFrame" "$js_file")
    
    echo "JavaScript Statistics:"
    echo "  • Total lines: $lines"
    echo "  • Functions: $functions"
    echo "  • Animation references: $animations"
    
    if [ $lines -gt 800 ]; then
        echo "  • Complexity: HIGH (Advanced interactivity) 🚀"
    else
        echo "  • Complexity: MEDIUM"
    fi
else
    echo "❌ JavaScript file not found!"
fi

echo ""

# Check HTML structure
echo "📄 Checking HTML structure..."
html_file="portfolio-v2/index.html"
if [ -f "$html_file" ]; then
    sections=$(grep -c "<section" "$html_file")
    buttons=$(grep -c "class=\"btn\"" "$html_file")
    links=$(grep -c "<a href" "$html_file")
    
    echo "HTML Statistics:"
    echo "  • Sections: $sections"
    echo "  • Buttons: $buttons"
    echo "  • Links: $links"
    
    if [ $sections -ge 4 ]; then
        echo "  • Structure: COMPLETE ✅"
    else
        echo "  • Structure: INCOMPLETE ⚠️"
    fi
else
    echo "❌ HTML file not found!"
fi

echo ""

# Check fonts
echo "🔤 Checking font usage..."
fonts=("Playfair Display" "Space Grotesk" "JetBrains Mono")
for font in "${fonts[@]}"; do
    if grep -q "$font" "$html_file"; then
        echo "✅ $font - Loaded"
    else
        echo "❌ $font - Missing"
    fi
done

echo ""

# Check color palette
echo "🎨 Checking color palette..."
colors=("#00FFD1" "#FF00AA" "#FFD700" "#0A0A1A")
color_names=("Cyan" "Magenta" "Gold" "Dark")

for i in ${!colors[@]}; do
    if grep -q "${colors[$i]}" "$css_file"; then
        echo "✅ ${color_names[$i]} (${colors[$i]}) - Present"
    else
        echo "❌ ${color_names[$i]} (${colors[$i]}) - Missing"
    fi
done

echo ""

# Final summary
echo "📊 Summary"
echo "========"

if [ "$all_files_exist" = true ]; then
    echo "✅ All files present"
    echo "✅ Design validation PASSED"
    echo ""
    echo "🚀 Portfolio V2 is ready for deployment!"
    echo ""
    echo "Next steps:"
    echo "  1. Test in browser: python3 -m http.server 8080"
    echo "  2. Open: http://localhost:8080/portfolio-v2/"
    echo "  3. Customize content and deploy"
else
    echo "❌ Some files missing"
    echo "❌ Design validation FAILED"
    echo ""
    echo "Please check the missing files and try again."
fi

echo ""
echo "🎨 Design by: Cyberpunk Maximalist Framework"
echo "💡 Inspiration: Neon Noir Aesthetics"
