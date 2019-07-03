const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// firebase deploy --only functions

exports.updateDocCount = functions.firestore
  .document('/stores/{userId}/location/{locationId}/items/{itemId}')
  .onWrite((change, context) => {

    const userId = context.params.userId;
    const locationId = context.params.locationId;
    let loc = {};

    const docRef = admin.firestore()
      .collection('stores').doc(userId)
      .collection('location').doc(locationId);

    docRef.get().then(location => {
      loc = location.data();
    });

    return docRef.collection('items').get().then(store => {
      let count = 0;
      const items = store.docs;

      items.forEach((item) => {
        const evaluatedItem = item.data();
        if (evaluatedItem.amount > 0) {
          count++;
        }
      });

      return docRef.update({...loc, count});
    });

  });
