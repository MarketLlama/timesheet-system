import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send('Hello from Firebase!');
});

//Will run every sunday @8am
/*
export const createTimeSheetWeek = functions.pubsub
    .schedule('0 8 * * 0')
    .timeZone('Europe/London')
    .onRun(async context => {
        const currentDate = new Date();
        await db
            .collection('Week')
            .doc()
            .create({
                title: `Week commencing : ${currentDate.toDateString}`,
                weekStart: currentDate,
                timestamp: context.timestamp,
                eventId: context.eventId,
            });
    });
*/
export const getUsersTimeSheets = functions.https.onRequest(
    async (request, response) => {
        const userId = request.query['userID'];
        let userTimesheets: any[] = [];
        try {
            await db
                .collection('Timesheets')
                .where('userID', '==', userId)
                .get()
                .then(snapshot => {
                    snapshot.forEach(doc => {
                        userTimesheets.push(doc.data());
                    });
                    response.send(userTimesheets);
                });
        } catch (error) {
            response.status(501);
            response.send(error);
        }
    }
);

export const removeUser = functions.auth.user().onDelete(async user => {
    await db
        .collection('Users')
        .doc(user.uid)
        .delete();
});
