// Valida si una fecha es real y en formato DD-MM-YYYY
const esFechaValidaDDMMYYYY = (fechaStr) => {
    const regex = /^\d{2}-\d{2}-\d{4}$/;
    if (!regex.test(fechaStr)) return false;
    const [dia, mes, anio] = fechaStr.split('-').map(Number);
    const fecha = new Date(anio, mes - 1, dia);
    return (
        fecha.getFullYear() === anio &&
        fecha.getMonth() === mes - 1 &&
        fecha.getDate() === dia
    );
};

// Valida un rango de fechas usando la función anterior
const validarRangoFechas = (desde, hasta) => {
    if (!esFechaValidaDDMMYYYY(desde) || !esFechaValidaDDMMYYYY(hasta)) {
        throw new Error('Las fechas deben tener el formato DD-MM-YYYY y ser válidas.');
    };
    const [diaDesde, mesDesde, anioDesde] = desde.split('-').map(Number);
    const [diaHasta, mesHasta, anioHasta] = hasta.split('-').map(Number);
    const fechaDesde = new Date(anioDesde, mesDesde - 1, diaDesde);
    const fechaHasta = new Date(anioHasta, mesHasta - 1, diaHasta);
    if (fechaDesde > fechaHasta) {
        throw new Error('La fecha inicial no puede ser posterior a la fecha final.');
    };
    return true;
};

module.exports = { 
                esFechaValidaDDMMYYYY,
                validarRangoFechas,
                };
