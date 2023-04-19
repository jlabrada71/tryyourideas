GIT_HASH=$(git rev-parse --short HEAD)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
GIT_TAG=$(git describe --tags)
echo "<template>Version $GIT_TAG ($GIT_BRANCH)</template>" > pages/version.vue

npm run build
tar -czf tryyourideas.com.tar .output
cd ../aws-config
./copy_ssh.sh ../tryyourideascom tryyourideas.com.tar

