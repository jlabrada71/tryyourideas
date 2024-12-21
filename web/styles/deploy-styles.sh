
rm .output/public/editor.css
npm run generate
mv .output/public/index.html .output/public/editor.css

# removes fists N lines
tail -n +4 .output/public/editor.css > tmp.csv && mv tmp.csv .output/public/editor.css

# removes last N lines
head -n -2 .output/public/editor.css > tmp.csv && mv tmp.csv .output/public/editor.css

# remove <style> from editor.css
sed 's/.*<style>//' .output/public/editor.css > tmp.csv && mv tmp.csv .output/public/editor.css

# remore </style> from editor.css
sed 's/<.style>.*//' .output/public/editor.css > tmp.csv && mv tmp.csv .output/public/editor.css

../../../aws-config/copy_ssh_to.sh .output/public/editor.css apps/resources.tryyourideas.com/uploads/assets/editor.css ../../../aws-config/juanlabrada.com.server 
