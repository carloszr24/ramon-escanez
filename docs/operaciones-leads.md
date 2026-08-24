# Operacion de leads organicos

## Flujo actual y puntos de fuga

1. **Captacion**: Facebook organico genera volumen alto de mensajes y comentarios.
2. **Registro**: gran parte de seguimiento vive dentro de Meta.
3. **Seguimiento**: sin estados unificados fuera de Facebook, el control depende de memoria/manual.
4. **Cierre**: no hay embudo cuantificado semanalmente para saber conversion por fase.

### Riesgos detectados
- Dependencia de un unico canal para historico de clientes.
- Dificultad para auditar tiempos de respuesta por lead.
- Menor trazabilidad de calidad por fuente/publicacion.

## Flujo operativo recomendado (hibrido)

1. **Entrada de lead**:
   - Web contacto -> `source=web_contacto`
   - Web valoracion -> `source=web_valoracion`
   - Facebook/WhatsApp/Telefono -> alta manual en panel
2. **Clasificacion inicial**:
   - `intent` (comprar/vender/alquilar)
   - `priority` (alta/media/baja)
   - `status=nuevo`
3. **Primer contacto (SLA)**:
   - Objetivo: primer contacto en 15 minutos.
   - Al contactar: actualizar `status=contactado` y `first_response_at`.
4. **Pipeline comercial**:
   - `nuevo` -> `contactado` -> `visita_agendada` -> `visita_realizada` -> `oferta` -> `reserva` -> `cerrado` / `descartado`
5. **Revision semanal**:
   - Leads entrantes
   - Tiempo medio de primera respuesta
   - % contactados <24h
   - % paso a visita
   - % cierre

## Protocolo rapido de prioridad

- **Alta**: venta inmediata, comprador con financiacion lista, solicitud de visita urgente.
- **Media**: interes real sin urgencia inmediata.
- **Baja**: consulta exploratoria o incompleta.

## Plantillas operativas sugeridas

- **Primer contacto**: "Gracias por escribirnos. Soy [nombre], en unos minutos te propongo las mejores opciones segun lo que buscas."
- **Seguimiento 24h**: "Te escribo para confirmar si seguimos adelante con la visita/propuesta."
- **Cierre no interesado**: "Cerramos este contacto por ahora. Si cambian tus necesidades, te atendemos de inmediato."
