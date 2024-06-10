<!-- 
This file provides your users an overview of how to use your extension after they've installed it. All content is optional, but this is the recommended format. Your users will see the contents of this file in the Firebase console after they install the extension.

Include instructions for using the extension and any important functional details. Also include **detailed descriptions** for any additional post-installation setup required by the user.

Reference values for the extension instance using the ${param:PARAMETER_NAME} or ${function:VARIABLE_NAME} syntax.
Learn more in the docs: https://firebase.google.com/docs/extensions/publishers/user-documentation#reference-in-postinstall

Learn more about writing a POSTINSTALL.md file in the docs:
https://firebase.google.com/docs/extensions/publishers/user-documentation#writing-postinstall
-->

# Mirror Database to Firestore

The Realtime Database is excellent due to its simplicity and affordability. However, it doesn't quite match Firestore's capabilities in terms of data filtering and maintenance.

This extension facilitates the mirroring of data from the Realtime Database to Firestore. If you need to transfer/sync data from the Realtime Database to Firestore, this extension is the perfect tool for the job.

# Installing the extension

`FROM_PATH` is where the data resides and where it watches for CRUD.

`TO_PATH` is where you want to mirror data to.





# Using the extension

After you complete the post-installation configuration above, the process runs as follows:

Your extension creates subcollections in all the documents that your app uses as counters.

The client sample writes to these subcollections to distribute the write load.

The controllerCore function sums the subcollections' values into the single visits field (or whichever field you configured in your master document).

After each summation, the extension deletes the subcollections, leaving only the count in the master document. This is the document field to which you should listen for the count.

# Monitoring

As a best practice, you can [monitor the activity](https://firebase.google.com/docs/extensions/manage-installed-extensions#monitor) of your installed extension, including checks on its health, usage, and logs.
