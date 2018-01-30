export const switchDialog = (id) => {
    return{
        type: 'SWITCH_DIALOG',
        payload:{
            id: id
        }
    }
}