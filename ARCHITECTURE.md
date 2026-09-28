# Arquitectura mínima para turnos y catálogo

El demo actual es una página estática. El formulario solo prepara una
solicitud para WhatsApp o para copiar. No reserva un horario ni envía los
datos a un servidor. El catálogo y la cesta son ilustrativos y no muestran
stock ni precios de venta.

## Solicitudes de turno

Para recibir solicitudes, una API debe guardar nombre, contacto, servicio,
preferencia de profesional, fecha propuesta, hora y notas con un estado
`solicitada`. El personal revisa su agenda real y acepta o propone otro
horario. El sitio debe mostrar la reserva como confirmada solo después de esa
respuesta o de una comprobación equivalente en un calendario conectado.

Antes de aceptar una solicitud, el servidor debe volver a comprobar el
horario y prevenir conflictos de agenda. Los datos personales requieren
validación, transporte cifrado, controles de acceso y un plazo de eliminación.

## Productos

El catálogo real debe venir de una fuente de inventario con nombres, marcas,
precios y stock actualizados. La cesta de este demo solo expresa interés. Para
aceptar pedidos se necesita un servicio de pedidos que reserve inventario y,
si se habilita pago en línea, un proveedor externo cuyo pago se valide en el
servidor. La web no debe comunicar compra ni stock confirmado por una
selección local.

El club debe elegir el calendario, el canal de notificación y, si aplica, el
proveedor de pagos antes de conectar esas integraciones. No hay proveedores
conectados en este demo.
