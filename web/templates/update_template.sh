 #this file should be in the same directory as the template in the server
 # /home/ubuntu/data/templates
 
 rm $1-old -rf
 mv $1 $1-old
 tar -xf $1.tar.gz 