export const selectDate = (year, month, date, display) => {
    return{
        type:'SELECT_DATE',
        payload:{
            year: year,
            month,
            date,
            display
        }
    }
}
export const slideCalendar = (direction, year, month, date, display, isOutside) => {
    return{
        type: 'SLIDE_CALENDAR',
        payload:{
            direction,
            year,
            month,
            date,
            display,
            isOutside
        }
    }
}
export const zoomCalendar = (direction, year, month, date, isOutside) => {
    return{
        type:'ZOOM_CALENDAR',
        payload:{
            direction,
            year,
            month,
            date,
            isOutside
        }
    }
}