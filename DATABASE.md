# User

name
email

# Board

owner -> one
team -> many (users)
lists -> many
isPrivate boolean
title varchar
description text
picture file/path

# List

title
tasks -> many

# task

members: from team -> many
labels -> many (text+color)
commnets -> many
attachments -> many (files! pictures)
title
description
cover
