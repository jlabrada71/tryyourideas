GIT_HASH=$(git rev-parse --short HEAD)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
GIT_TAG=$(git describe --tags)
GIT_TAG_ABBR=$(git describe --tags --abbrev=0)
NEW_TAG=$1
NEW_TAG_MSG=$2

RELEASE_NOTES=$(git log $GIT_TAG_ABBR..HEAD --oneline)

if [ -z "$NEW_TAG" ]
then 
  echo "Last tag: $GIT_TAG"
  echo $RELEASE_NOTES

  echo "usage: ./deploy.sh <new tag> '<new tag message>'"
else
  
  echo '=============' >> RELEASE_NOTES.txt
  echo "$NEW_TAG => $NEW_TAG_MSG" >> RELEASE_NOTES.txt
  echo '---------' >> RELEASE_NOTES.txt
  echo $RELEASE_NOTES >> RELEASE_NOTES.txt
  echo "<template>Version $NEW_TAG ($GIT_BRANCH)</template>" > components/ProductVersion.vue
  git commit -am "Creating release $NEW_TAG $NEW_TAG_MSG"
  create_tag $NEW_TAG "$NEW_TAG_MSG"
  npm run build
  tar -czf tryyourideas.com.tar .output
  cd ../aws-config
  ./copy_ssh.sh ../tryyourideascom tryyourideas.com.tar juanlabrada.com.server
  server=`cat juanlabrada.com.server`
  ssh -i ~/.ssh/aws-juanlabrada.com.pem $server './new_deploy.sh'
  cd ../tryyourideascom
fi
