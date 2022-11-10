rm -rf front/public/components/tmpl
mkdir front/public/components/tmpl
watched_dir="front/public/components/html/"
templated_dir="front/public/components/tmpl/"
for template in "$watched_dir"*;
do
  templated=$(basename "${template%.html}").tmpl.js
  handlebars "$template" -f "$templated_dir$templated"
done