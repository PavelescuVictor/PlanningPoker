const state = {
    ROOM_TYPES: {
        PLANNING_POKER: 1,
        RETROSPECTIVE: 2,
    },
    COLLECTION_NAME: "rooms",
    room: null,
};

const getters = {
    getRoomTypes: (state) => state.ROOM_TYPES,
    getRoom: (state) => state.room,
};

const actions = {
    // retrieveRooms({ commit, rootState }) {
    //     return new Promise((resolve, reject) => {
    //         rootState.db.collection(state.COLLECTION_NAME).get()
    //         .then((results) => {
    //             results.forEach((doc) => {
    //                 console.log(doc.id, " => ", doc.data());
    //             });
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         })
    //     });
    // },

    createRoom({ rootState, state}, payload) {
        return new Promise((resolve, reject) => {
            console.log("create room", payload);
            rootState.db.collection(state.COLLECTION_NAME).add({
                roomType: payload.roomType,
                connectedUsers: {}[payload.userId] = { userName: payload.userName, isAdmin: true },
                sessionTitle: payload.sessionTitle,
                sessionDescription: payload.sessionDescription,
                sessionEntries: {},
                isActive: true,
                createdAt: firebase.firestore.FieldValue.serverTimestamp,
                createdBy: {}[payload.userId] = payload.userName,
            })
            .then(roomRef => {
                resolve(roomRef);
            })
            .catch(error => {
                reject(error);   
            });
        });
    },

    retrieveRoom({ rootState, state}, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).get()
            .then((results) => {
                console.log("retrieveRoom", results);
                commit("RETRIEVE_ROOM", results)
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    retrieveUserRooms({ rootState, state}, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).get()
            .then((results) => {
                console.log("retrieveUserRooms", results);
                commit("RETRIEVE_ROOM", results)
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    deleteRoom({ rootState, state}, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).delete()
            .then((results) => {
                console.log("deleteRoom", results);
                commit("RETRIEVE_ROOM", results)
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    deleteUserRooms({ rootState, state}, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).delete()
            .then((results) => {
                console.log("deleteUserRooms", results);
                commit("RETRIEVE_ROOM", results)
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    modifyRoomDescription({ state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).update({
                sessionDescription: payload.sessionDescription,
            })
            .then(results => {
                console.log("modifytRoomDescription", results)
                resolve(results);
            })
            .catch(error => {
                reject(error);   
            });
        });
    },

    modifyRoomTitle({ state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).update({
                sessionTitle: payload.sessionTitle,
            })
            .then(results => {
                console.log("modifytRoomDescription", results)
                resolve(results);
            })
            .catch(error => {
                reject(error);   
            });
        });
    },


    addUserToRoom({ state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).update({
                [`connectedUser.${payload.userId}`]: { userName: payload.userName, isAdmin: true },
            })
            .then(results => {
                console.log("addUserToRoom", results)
                resolve(results);
            })
            .catch(error => {
                reject(error);   
            });
        });
    },

    removeUserFromRoom({ state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            console.log("add user", payload);
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).update({
                [`connectedUser.${payload.userId}`]: firebase.firestore.FieldValue.delete(),
            })
            .then(results => {
                console.log("removeUserFromRoomn", results);
                resolve(results);
            })
            .catch(error => {
                reject(error);   
            });
        });
    },

    toggleUserAdminStatus({ state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            console.log("add user", payload);
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).update({
                [`connectedUser.${payload.userId}.isActive`]: ![`connectedUser.${payload.userId}.isActive`],
            })
            .then(results => {
                console.log("makeUserAdmin", results);
                resolve(results);
            })
            .catch(error => {
                reject(error);   
            });
        });
    },

    createSessionEntry({ state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).add({
                [`sessionsEntries.${payload.sessionEntryId}`]: {
                    sessionEntryType: payload.sessionType,
                    sessionEntryTitle: payload.sessionTitle,
                    sessionEntryDescription: payload.sessionDescription,
                    sessionEntrySubmittedPoints: {},
                    isActive: true,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp,
                    createdBy: payload.createdBy,
                }
            })
            .then(results => {
                console.log("addSessionEntry", results);
                resolve(results);
            })
            .catch(error => {
                reject(error);
            })
        });
    },

    retrieveSessionEntry({ rootState, state}, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).get()
            .then((results) => {
                console.log("retrieveRoom", results);
                commit("RETRIEVE_ROOM", results)
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    modifySessionEntryTitle({ state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).update({
                [`sessionEntries.${payload.sessionEntryId}.sessionTitle`]: payload.sessionTitle,
            })
        })
    },

    modifySessionEntryDescription({ state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).update({
                [`sessionEntries.${payload.sessionEntryId}.sessionDescription`]: payload.sessionDescription,
            })
        })
    },

    submitPointsToSessionEntry({ state, rootState}, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).add({
                [`sessionEntries.${payload.sessionEntryId}.sessionEntrySubmittedPoints.${payload.userId}`]: { pointsValue: payload.pointsValue },
            })
            .then(results => {
                console.log("submitPointsToSessionEntry", results);
                resolve(results);
            })
            .catch(error => {
                reject(error);   
            });
        });
    },

    removePointsFromSessionEntry({ state, rootState }, payload) {
        return new Promise((resolve, reject) => {
            console.log("add user", payload);
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).update({
                [`sessionEntries.${payload.sessionEntryId}.sessionEntrySubmittedPoints.${payload.userId}`]: { points: payload.pointsValue},
            })
            .then(results => {
                console.log("removeUserFromRoomn", results);
                resolve(results);
            })
            .catch(error => {
                reject(error);   
            });
        });
    },

    deleteSessionEntry({ rootState, state }, payload) {
        return new Promise((resolve, reject) => {
            rootState.db.collection(state.COLLECTION_NAME).doc(payload.roomId).delete()
            .then((results) => {
                console.log("deleteSessionEntry", results);
                commit("RETRIEVE_ROOM", results)
                resolve(results);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },
};

const mutations = {
    RETRIEVE_ROOM(state, room) {
        state.room = room;
    },

    EMPTY_ROOM(state) {
        state.room = null;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
