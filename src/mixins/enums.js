export default {
    data: () => ({
        bookingType: {
            ANNUAL_SERVICE: "Annual Service",
            MAJOR_SERVICE: "Major service",
            REPAIR_FAULT: "Repair/Fault",
            MAJOR_REPAIR: "Major repair",
        },
        bookingStatus: {
            BOOKED: 'Booked',
            IN_SERVICE: 'In service',
            FIXED: 'Fixed',
            COLLECTED: 'Collected',
            WAITING_CONFIRMATION: 'Waiting confirmation',
            UNREPAIRABLE: 'Urnrepairable',
        },
        engineType: {
            DIESEL: 'Diesel',
            PETROL: 'Petrol',
            HYBRID: 'Hybrid',
            ELECTRIC: 'Electric',
        }
    })
}
