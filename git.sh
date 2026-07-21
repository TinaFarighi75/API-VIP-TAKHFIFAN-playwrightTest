
#!/bin/bash

if [[ $1 = "github" ]]; then
   git config --local user.email "tinafarighi75@gmail.com"
   git config --local user.name "TinaFarighi75"
   echo "Change git user to 'gitHub'"
elif [[ $1 = "gitlab" ]]; then
   git config --local user.email "t.farighi@takhfifan.com"
   git config --local user.name "Tina Farighi"
   echo "Change git user to 'gitlab'"
else
    echo "Please provide a valid argument: 'github' or 'gitlab'"
fi

# chmod 777 git.sh  #To give access
# ./git.sh github #before push to gitHub
# ./git.sh gitlab  #before push to gitLab