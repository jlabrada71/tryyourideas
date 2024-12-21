sudo cp ./nuxt3-tailwindcss /home/ubuntu/data/templates -r
rm nuxt3-tailwindcss.tar.gz
tar -czf nuxt3-tailwindcss.tar.gz nuxt3-tailwindcss

PROJECT=nuxt3-tailwindcss
SERVER=juanlabrada.com.server
PTH=$(pwd)
echo $PTH

cd /media/jlabrada/data/sources/aws/aws-config
./copy_ssh_to.sh $PTH/$PROJECT.tar.gz data/templates $SERVER
cd $PTH


