const functions = require('firebase-functions');
const firebase = require('firebase');

// firebase deploy --only functions

exports.updateDocCount = functions.firestore
  .document('/stores/{userId}/location/{locationId}/items/{itemId}')
  .onWrite((change, context) => {

    const userId = context.params.userId;
    const locationId = context.params.locationId;

    const docRef = firebase.firestore()
      .collection('stores').doc(userId)
      .collection('location').doc(locationId);

    const loc = docRef.get();

    return docRef.collection('items').get().then(store => {
      let count = 0;
      const items = store.docs;

      items.forEach((item) => {
        const evaluatedItem = item.data();
        if (evaluatedItem.amount > 0) {
          count++;
        }
      });

      const data = { ...loc.data(), count };
      return docRef.update(data);
    });

  });
