const { Document, Packer, Paragraph, TextRun, AlignmentType } = require('docx');
const fs = require('fs');
const path = require('path');

const questions = [
  // TEMA 1
  { topic: "T1", question: "¿Cuál de las tres afirmaciones siguientes no es cierta?", options: [
    {l:"a", t:"En las empresas se coordinan los factores de producción."},
    {l:"b", t:"Las empresas crean o aumentan la utilidad de los bienes."},
    {l:"c", t:"Las empresas no asumen riesgos."}
  ], answer: "c" },
  { topic: "T1", question: "El concepto I+D+I se refiere a:", options: [
    {l:"a", t:"La innovación, el desarrollo e internet."},
    {l:"b", t:"La inversión, el derecho y la innovación."},
    {l:"c", t:"La investigación, el desarrollo y la innovación."}
  ], answer: "c" },
  { topic: "T1", question: "En el análisis DAFO, ¿qué representa la aparición de productos sustitutivos?", options: [
    {l:"a", t:"Una amenaza."},
    {l:"b", t:"Una debilidad."},
    {l:"c", t:"Una oportunidad."}
  ], answer: "a" },
  { topic: "T1", question: "Los clientes de una empresa forman parte del:", options: [
    {l:"a", t:"Entorno específico."},
    {l:"b", t:"Entorno general."},
    {l:"c", t:"Los clientes de una empresa no forman parte."}
  ], answer: "a" },
  { topic: "T1", question: "¿Cuál de los siguientes aspectos constituyen el entorno específico de la empresa?", options: [
    {l:"a", t:"Entorno económico."},
    {l:"b", t:"Los competidores."},
    {l:"c", t:"Entorno ecológico o medioambiental."}
  ], answer: "b" },
  { topic: "T1", question: "El entorno que afecta a todas las empresas se llama:", options: [
    {l:"a", t:"Entorno específico."},
    {l:"b", t:"Entorno general."},
    {l:"c", t:"Cultura de la empresa."}
  ], answer: "b" },
  { topic: "T1", question: "Con respecto a los objetivos empresariales podemos decir:", options: [
    {l:"a", t:"Todas las empresas tienen como principal objetivo maximizar el beneficio."},
    {l:"b", t:"Podemos diferenciar tres niveles de objetivos: fin u objetivo general, objetivos y subobjetivos."},
    {l:"c", t:"Se dejan plasmados en un documento denominado como Balance Social."}
  ], answer: "b" },
  { topic: "T1", question: "Las PYMES:", options: [
    {l:"a", t:"Son siempre las empresas menos eficientes y menos rentables."},
    {l:"b", t:"Tienen un fuerte poder financiero."},
    {l:"c", t:"Son las grandes empresas generadoras de empleo en España."}
  ], answer: "c" },
  { topic: "T1", question: "Hablamos de crecimiento interno de una empresa:", options: [
    {l:"a", t:"Cuando se produce una ampliación de las instalaciones de la empresa mediante la adquisición de nueva maquinaria que incrementa su capacidad productiva."},
    {l:"b", t:"Cuando se produce una fusión o una absorción."},
    {l:"c", t:"Cuando se unen varias empresas de un mismo sector productivo formando un cártel."}
  ], answer: "a" },
  { topic: "T1", question: "Cuando una sociedad compra el patrimonio de otra u otras y lo integran en el suyo propio, se ha producido:", options: [
    {l:"a", t:"Un cártel."},
    {l:"b", t:"Una alianza empresarial."},
    {l:"c", t:"Una absorción."}
  ], answer: "c" },
  { topic: "T1", question: "Una de las ventajas de las pymes es su:", options: [
    {l:"a", t:"Flexibilidad."},
    {l:"b", t:"Su facilidad de acceso a la financiación."},
    {l:"c", t:"La posibilidad de aprovecharse de la creación de economías de escala."}
  ], answer: "a" },
  { topic: "T1", question: "En cuanto a la responsabilidad social de la empresa:", options: [
    {l:"a", t:"La actuación de la empresa debe procurar beneficios exclusivamente a los socios."},
    {l:"b", t:"La comunidad en la que se ubique la empresa debe procurar suministrar a la empresa todos los recursos que necesite."},
    {l:"c", t:"Implica una actuación que no perjudique los derechos e intereses de otros grupos de la comunidad."}
  ], answer: "c" },
  { topic: "T1", question: "Una empresa tiene una ventaja competitiva cuando:", options: [
    {l:"a", t:"El valor de sus acciones muestra un comportamiento creciente."},
    {l:"b", t:"Opera en un mercado muy competitivo."},
    {l:"c", t:"Posee una característica de la que carece el resto de competidores."}
  ], answer: "c" },
  { topic: "T1", question: "La actividad económica es aquella actividad humana encaminada a satisfacer necesidades utilizando:", options: [
    {l:"a", t:"Recursos ilimitados y susceptibles de una única aplicación."},
    {l:"b", t:"Recursos escasos y susceptibles de usos alternativos."},
    {l:"c", t:"Recursos escasos y susceptibles de una única aplicación."}
  ], answer: "b" },
  { topic: "T1", question: "La función financiera de la empresa se refiere a:", options: [
    {l:"a", t:"Actividades de apoyo a la gestión mediante la creación de sistemas de información económico-financiera y contabilidad."},
    {l:"b", t:"Actividades de captación, tratamiento y colocación de recursos financieros."},
    {l:"c", t:"Actividades de investigación y desarrollo de productos y formas de producirlos, así como su posible financiación."}
  ], answer: "b" },
  { topic: "T1", question: "Las empresas multinacionales se caracterizan porque:", options: [
    {l:"a", t:"Son empresas que se dedican a la venta y exportación desde su país de origen a multitud de países extranjeros."},
    {l:"b", t:"Son grandes empresas que operan en los mercados de varios países a partir de empresas filiales con una fuerte dirección centralizada de la empresa matriz."},
    {l:"c", t:"Son organizaciones que facilitan el desarrollo de las regiones atrasadas en donde se instalan."}
  ], answer: "b" },
  { topic: "T1", question: "Decimos que una empresa tiene \"capacidad ociosa\":", options: [
    {l:"a", t:"Cuando se encuentra localizada en una zona con servicios complementarios y de ocio."},
    {l:"b", t:"Cuando la empresa no ha conseguido minimizar el coste unitario de sus productos."},
    {l:"c", t:"Cuando existe un cierto grado de subutilización, es decir, no se está produciendo al máximo de la capacidad de producción."}
  ], answer: "c" },
  { topic: "T1", question: "Hablamos de Competitividad cuando:", options: [
    {l:"a", t:"En un mercado existen muchos oferentes de un mismo producto sin poder de fijación de los precios."},
    {l:"b", t:"Los costes de los productos de una empresa permiten establecer unos precios en posición de ventaja relativa respecto a otras con las que concurre en el mercado."},
    {l:"c", t:"Ninguna de las anteriores."}
  ], answer: "b" },
  { topic: "T1", question: "Basándose en el número de trabajadores, se entiende por empresa pequeña a la que:", options: [
    {l:"a", t:"Tiene menos de 150 trabajadores."},
    {l:"b", t:"Tiene menos de 250 trabajadores."},
    {l:"c", t:"Tiene menos de 50 trabajadores."}
  ], answer: "c" },
  { topic: "T1", question: "Una empresa que fabrica impresoras decide ampliar su actividad con la elaboración del sistema inalámbrico \"wifi\" de impresión, que antes tenía que comprar a otro fabricante. Está utilizando una estrategia de:", options: [
    {l:"a", t:"Diversificación horizontal."},
    {l:"b", t:"Diversificación vertical."},
    {l:"c", t:"Concentración de productos."}
  ], answer: "b" },
  { topic: "T1", question: "La dimensión de una empresa es:", options: [
    {l:"a", t:"El tamaño físico o espacio que ocupan las explotaciones."},
    {l:"b", t:"La capacidad de producción de las explotaciones."},
    {l:"c", t:"La tasa máxima de producción en condiciones extraordinariamente favorables."}
  ], answer: "b" },
  { topic: "T1", question: "Las Pymes son:", options: [
    {l:"a", t:"Empresas que se dedican a dar asesoramiento fiscal y contable a las empresas."},
    {l:"b", t:"Las empresas mayoritarias en la economía española, llegando al 90% de las empresas españolas, con una gran importancia social y económica al generar el mayor número de empleo del país."},
    {l:"c", t:"Empresas que emplean más de 250 trabajadores y menos de 500 trabajadores."}
  ], answer: "b" },
  { topic: "T1", question: "Son factores que influyen en la decisión de la localización de la empresa:", options: [
    {l:"a", t:"La existencia de clubes sociales."},
    {l:"b", t:"Los relativos al transporte, producción, climáticos y medio ambientales."},
    {l:"c", t:"Que el empresario sea oriundo de la zona."}
  ], answer: "b" },
  { topic: "T1", question: "La distribución de un producto sería una actividad propia de la función:", options: [
    {l:"a", t:"De Producción."},
    {l:"b", t:"De Comercialización."},
    {l:"c", t:"De Administración."}
  ], answer: "b" },
  { topic: "T1", question: "La función de producción de la empresa es aquella que se dedica a:", options: [
    {l:"a", t:"Transformar los productos terminados en ingresos."},
    {l:"b", t:"Incrementar el valor de los factores a través de un proceso de transformación."},
    {l:"c", t:"Estudiar cuáles son las inversiones que debe realizar la empresa y cómo debe financiarlas."}
  ], answer: "b" },
  { topic: "T1", question: "La actividad económica de las empresas pretende:", options: [
    {l:"a", t:"Satisfacer necesidades humanas para lograr un lucro."},
    {l:"b", t:"Transformar factores productivos en productos y servicios terminados."},
    {l:"c", t:"Llevar a cabo su actividad de la mejor manera posible."}
  ], answer: "a" },
  { topic: "T1", question: "Los grupos de presión hacen referencia a:", options: [
    {l:"a", t:"A los factores del entorno general que pueden influir en la empresa."},
    {l:"b", t:"A otras empresas del sector y por tanto competidoras de la nuestra."},
    {l:"c", t:"Aquellos colectivos de personas que se encuentran relacionadas con la empresa y que de forma más o menos organizada tratan de influir sobre la marcha de la empresa."}
  ], answer: "c" },
  { topic: "T1", question: "¿Qué estrategia lleva a cabo una empresa fabricante de zumos que decide vender vino?", options: [
    {l:"a", t:"Diversificación vertical."},
    {l:"b", t:"Diversificación horizontal."},
    {l:"c", t:"Diversificación externa."}
  ], answer: "b" },
  { topic: "T1", question: "¿Qué es un holding?", options: [
    {l:"a", t:"Conjunto de empresas que tienen la misma actividad."},
    {l:"b", t:"Grupo de empresas en las que una controla a las demás."},
    {l:"c", t:"Grupo de empresas que tienen las mismas fuentes de financiación ajena."}
  ], answer: "b" },
  { topic: "T1", question: "Cuando una empresa adquiere otra, extinguiéndose esta última, de forma que el patrimonio es asumido por la primera, decimos que se ha producido:", options: [
    {l:"a", t:"Una fusión."},
    {l:"b", t:"Una absorción."},
    {l:"c", t:"Una internacionalización."}
  ], answer: "b" },
  { topic: "T1", question: "La dimensión de una empresa hace referencia, entre otros rasgos:", options: [
    {l:"a", t:"A su volumen de negocio."},
    {l:"b", t:"A la diversificación de sus mercados."},
    {l:"c", t:"Las dos respuestas anteriores son correctas."}
  ], answer: "c" },
  { topic: "T1", question: "¿Cuál de las siguientes respuestas recoge criterios válidos para clasificar las empresas por su tamaño?", options: [
    {l:"a", t:"El volumen de ventas y el número de trabajadores."},
    {l:"b", t:"El número de proveedores y clientes."},
    {l:"c", t:"El tamaño de la superficie sobre las que se encuentran sus instalaciones."}
  ], answer: "a" },
  { topic: "T1", question: "El entorno próximo o específico de la empresa lo componen:", options: [
    {l:"a", t:"Competidores, grupos de presión, clientes y proveedores."},
    {l:"b", t:"Tecnología, leyes, factores políticos y socioculturales."},
    {l:"c", t:"Factores económicos, clientes, competidores y factores ecológicos."}
  ], answer: "a" },
  { topic: "T1", question: "La función de Contabilidad y Registro de la empresa se refiere a:", options: [
    {l:"a", t:"Actividades de apoyo a la gestión mediante la creación de sistemas de información económico-financiera y contabilidad."},
    {l:"b", t:"Actividades de captación, tratamiento y colación de recursos financieros."},
    {l:"c", t:"Ninguna de las respuestas anteriores es correcta."}
  ], answer: "a" },
  { topic: "T1", question: "Cuando dos empresas se unen perdiendo sus personalidades jurídicas y aparece una nueva, decimos que se ha producido:", options: [
    {l:"a", t:"Una fusión."},
    {l:"b", t:"Una absorción."},
    {l:"c", t:"Una internacionalización."}
  ], answer: "a" },
  { topic: "T1", question: "La estrategia de diversificación dirigida hacia el mercado de productos complementarios o sustitutivos de los ya producidos, es la diversificación:", options: [
    {l:"a", t:"Vertical."},
    {l:"b", t:"Horizontal."},
    {l:"c", t:"Externa."}
  ], answer: "b" },
  { topic: "T1", question: "¿Cuál de las siguientes situaciones puede considerarse una estrategia de crecimiento interno de la empresa basada en la diversificación?", options: [
    {l:"a", t:"Vender más cantidad de nuestro producto habitual a nuestros clientes de siempre."},
    {l:"b", t:"Vender nuestro producto de siempre en nuevos mercados."},
    {l:"c", t:"Ampliar nuestra cartera con productos diferentes vendidos en nuevos mercados."}
  ], answer: "c" },
  { topic: "T1", question: "¿A cuál de los siguientes términos corresponde la definición: nivel máximo de producción que se puede obtener en un periodo de tiempo determinado?", options: [
    {l:"a", t:"Dimensión."},
    {l:"b", t:"Capacidad necesaria de producción."},
    {l:"c", t:"Localización."}
  ], answer: "a" },
  { topic: "T1", question: "En una empresa, las decisiones estratégicas se toman a nivel de:", options: [
    {l:"a", t:"La dirección estratégica."},
    {l:"b", t:"La alta dirección."},
    {l:"c", t:"La dirección de planificación."}
  ], answer: "b" },
  { topic: "T1", question: "El objetivo de la responsabilidad social de la empresa es:", options: [
    {l:"a", t:"Incrementar la rentabilidad económica de la empresa."},
    {l:"b", t:"Asumir como propios los costes sociales de la empresa."},
    {l:"c", t:"Mejorar la productividad de los trabajadores."}
  ], answer: "b" },
  { topic: "T1", question: "La dimensión de una empresa hace referencia:", options: [
    {l:"a", t:"A los metros cuadrados que ocupa el solar donde está ubicada."},
    {l:"b", t:"A la capacidad de producción de la empresa."},
    {l:"c", t:"Al número de años que la empresa lleva existiendo en el mercado."}
  ], answer: "b" },
  { topic: "T1", question: "La deslocalización empresarial se produce cuando:", options: [
    {l:"a", t:"Una empresa tiene agencias o sucursales repartidas por todo el mundo."},
    {l:"b", t:"Una empresa abandona un país para instalar sus instalaciones en otro país."},
    {l:"c", t:"No se conocen los centros de producción de la empresa."}
  ], answer: "b" },
  { topic: "T1", question: "La fijación de objetivos en la empresa:", options: [
    {l:"a", t:"Es parte de la función de organización."},
    {l:"b", t:"Es parte de la función de producción."},
    {l:"c", t:"Es parte de la función de planificación."}
  ], answer: "c" },
  { topic: "T1", question: "La pandemia sufrida por la COVID 19:", options: [
    {l:"a", t:"Es un factor económico del entorno general de cualquier empresa."},
    {l:"b", t:"No afecta a las empresas de modo significativo."},
    {l:"c", t:"Es un factor exclusivo del entorno específico de las empresas sanitarias."}
  ], answer: "a" },
  { topic: "T1", question: "Las economías de escala se generan más frecuentemente:", options: [
    {l:"a", t:"En las PYMES."},
    {l:"b", t:"En las empresas grandes y multinacionales."},
    {l:"c", t:"En los autónomos."}
  ], answer: "b" },
  { topic: "T1", question: "Uno de los objetivos fundamentales de la empresa es:", options: [
    {l:"a", t:"Generar valor económico."},
    {l:"b", t:"Pagar los salarios a sus trabajadores."},
    {l:"c", t:"Ganar dinero."}
  ], answer: "a" },
  { topic: "T1", question: "Una ventaja competitiva:", options: [
    {l:"a", t:"Significa que la empresa siempre obtendrá beneficio."},
    {l:"b", t:"Es ofrecer el mismo producto en todos los mercados en los que está la empresa."},
    {l:"c", t:"Es una fortaleza que tiene nuestra empresa y no la tiene ningún otro competidor."}
  ], answer: "c" },
  { topic: "T1", question: "Los proveedores de una empresa forman parte del:", options: [
    {l:"a", t:"Entorno general."},
    {l:"b", t:"Entorno específico."},
    {l:"c", t:"Los proveedores no forman parte del entorno de la empresa."}
  ], answer: "b" },
  { topic: "T1", question: "¿Cuál de los siguientes no es uno de los objetivos de la deslocalización de empresas?", options: [
    {l:"a", t:"Ahorro de costes."},
    {l:"b", t:"Beneficiarse de una fiscalidad más favorable."},
    {l:"c", t:"Mejora de las condiciones laborales de los/as trabajadores/as."}
  ], answer: "c" },
  { topic: "T1", question: "El entorno específico de la empresa lo conforman, entre otros:", options: [
    {l:"a", t:"Los clientes, proveedores y los factores culturales."},
    {l:"b", t:"Los factores políticos, económicos y tecnológicos."},
    {l:"c", t:"Los clientes, proveedores y competencia."}
  ], answer: "c" },
  { topic: "T1", question: "¿Cuál de las siguientes características no es propia de las empresas multinacionales?", options: [
    {l:"a", t:"Tienen tecnología punta."},
    {l:"b", t:"Gracias a su tamaño pueden alcanzar economías de escala."},
    {l:"c", t:"La empresa matriz no ejerce control sobre sus filiales."}
  ], answer: "c" },
  { topic: "T1", question: "La deslocalización empresarial:", options: [
    {l:"a", t:"Es una consecuencia de la globalización mundial de los mercados."},
    {l:"b", t:"Supone grandes beneficios económicos para el país donde la empresa deja de producir."},
    {l:"c", t:"Es un fenómeno que provoca que empresas del Sudeste Asiático trasladen sus instalaciones a la Unión Europea."}
  ], answer: "a" },
  // TEMA 2
  { topic: "T2", question: "En una clasificación de las empresas atendiendo a su actividad, podemos calificar de terciarias o del sector terciario:", options: [
    {l:"a", t:"A las de fabricación de productos de alta tecnología."},
    {l:"b", t:"A las agrícolas y ganaderas."},
    {l:"c", t:"A las de servicios."}
  ], answer: "c" },
  { topic: "T2", question: "Las empresas se clasifican según la propiedad del capital en:", options: [
    {l:"a", t:"Pequeñas, medianas y grandes."},
    {l:"b", t:"Primario, secundario y terciario."},
    {l:"c", t:"Públicas, privadas y mixtas."}
  ], answer: "c" },
  { topic: "T2", question: "Un restaurante es una empresa:", options: [
    {l:"a", t:"Del sector primario."},
    {l:"b", t:"Del sector secundario."},
    {l:"c", t:"Del sector terciario."}
  ], answer: "c" },
  { topic: "T2", question: "Por la propiedad o titularidad del capital social, una empresa puede ser:", options: [
    {l:"a", t:"Empresa productora o comercial."},
    {l:"b", t:"Empresa privada, pública o mixta."},
    {l:"c", t:"Empresa primaria, secundaria o terciaria."}
  ], answer: "b" },
  { topic: "T2", question: "Las empresas cuya actividad es la enseñanza pertenecen al sector:", options: [
    {l:"a", t:"Primario."},
    {l:"b", t:"Secundario."},
    {l:"c", t:"Terciario."}
  ], answer: "c" },
  { topic: "T2", question: "¿Qué es una empresa pública?", options: [
    {l:"a", t:"Aquella cuya titularidad pertenece al Estado."},
    {l:"b", t:"Aquella en la que puede entrar cualquier persona."},
    {l:"c", t:"Aquella que recibe su capital de muchas personas."}
  ], answer: "a" },
  { topic: "T2", question: "La actividad de extracción de minerales realizada por una empresa se considera como:", options: [
    {l:"a", t:"Primaria."},
    {l:"b", t:"Secundaria."},
    {l:"c", t:"Terciaria."}
  ], answer: "b" },
  { topic: "T2", question: "De las sociedades laborales podemos decir:", options: [
    {l:"a", t:"Que todo el capital, obligatoriamente, debe estar en manos de socios trabajadores."},
    {l:"b", t:"Que una administración pública puede ser socio de dichas empresas."},
    {l:"c", t:"Que su capital nunca puede ser inferior a 20.000 euros."}
  ], answer: "b" },
  { topic: "T2", question: "Los Administradores de una Sociedad Anónima:", options: [
    {l:"a", t:"Deben ser accionistas de la empresa."},
    {l:"b", t:"Tienen derecho al reparto de beneficios a través de dividendos."},
    {l:"c", t:"Son nombrados por la Junta General."}
  ], answer: "c" },
  { topic: "T2", question: "Las acciones de una sociedad anónima:", options: [
    {l:"a", t:"No pueden cotizar en bolsa. Deben transformarse en participaciones cotizables, iguales, acumulables e indivisibles."},
    {l:"b", t:"Pueden cotizar en bolsa bajo la par, a la par o sobre la par, según las circunstancias del mercado."},
    {l:"c", t:"Representan un derecho de cobro frente a la sociedad que puede ejecutarse en cualquier momento."}
  ], answer: "b" },
  { topic: "T2", question: "Una sociedad mixta referida a la titularidad del capital:", options: [
    {l:"a", t:"Es la que pertenece a entidades privadas y públicas."},
    {l:"b", t:"Es aquella en la que el capital está repartido en acciones y obligaciones."},
    {l:"c", t:"Su capital está financiado a corto y a largo plazo."}
  ], answer: "a" },
  { topic: "T2", question: "En la Sociedad Cooperativa:", options: [
    {l:"a", t:"El capital está dividido en acciones."},
    {l:"b", t:"El capital está dividido en participaciones que pueden cotizar en bolsa si lo solicita la sociedad."},
    {l:"c", t:"El Capital es variable entre un máximo y un mínimo fijado en los estatutos."}
  ], answer: "c" },
  { topic: "T2", question: "Si se crea una empresa encargada exclusivamente de la organización del mundial de fútbol Rusia 2018, se podría afirmar que dicha empresa pertenece al sector:", options: [
    {l:"a", t:"Primario."},
    {l:"b", t:"Secundario."},
    {l:"c", t:"Terciario."}
  ], answer: "c" },
  { topic: "T2", question: "Con relación a las sociedades de responsabilidad limitada, señale cuál de las siguientes afirmaciones NO es correcta:", options: [
    {l:"a", t:"El número de socios para su constitución es de uno o más."},
    {l:"b", t:"La responsabilidad de los socios es limitada."},
    {l:"c", t:"El capital social está dividido en acciones."}
  ], answer: "c" },
  { topic: "T2", question: "Una empresa cuya actividad es la elaboración de conservas de pescado pertenece al sector:", options: [
    {l:"a", t:"Primario."},
    {l:"b", t:"Secundario."},
    {l:"c", t:"Terciario."}
  ], answer: "b" },
  { topic: "T2", question: "Las sociedades anónimas laborales:", options: [
    {l:"a", t:"Tienen sus acciones representadas mediante anotaciones en cuenta."},
    {l:"b", t:"Tienen su capital dividido en acciones al portador."},
    {l:"c", t:"Tienen dos clases de acciones: Clase laboral (pertenecientes a los socios trabajadores) y clase general (pertenecientes a los socios no trabajadores, si los hay)."}
  ], answer: "c" },
  { topic: "T2", question: "Las acciones de una sociedad anónima:", options: [
    {l:"a", t:"Siempre cotizan sobre la par."},
    {l:"b", t:"Se pueden transmitir libremente."},
    {l:"c", t:"No pueden cotizar en Bolsa."}
  ], answer: "b" },
  { topic: "T2", question: "En la Sociedad Cooperativa, los órganos sociales son:", options: [
    {l:"a", t:"El capital está dividido en acciones."},
    {l:"b", t:"Existen dos tipos de socios: los colectivos y los comanditarios."},
    {l:"c", t:"La Asamblea General, el Consejo Rector, el Comité de Recursos y los Interventores."}
  ], answer: "c" },
  { topic: "T2", question: "El empresario individual:", options: [
    {l:"a", t:"Tributa a través del impuesto sobre la renta de las personas físicas."},
    {l:"b", t:"No puede tener trabajadores a su cargo."},
    {l:"c", t:"Su responsabilidad es siempre limitada ante las deudas contraídas con terceros."}
  ], answer: "a" },
  { topic: "T2", question: "Los órganos principales de la Cooperativa son:", options: [
    {l:"a", t:"La Asamblea General y el Consejo Rector."},
    {l:"b", t:"La Junta General y los Administradores."},
    {l:"c", t:"La Junta General y los Auditores."}
  ], answer: "a" },
  { topic: "T2", question: "Son sociedades capitalistas:", options: [
    {l:"a", t:"Las sociedades comanditarias simples."},
    {l:"b", t:"Las sociedades civiles."},
    {l:"c", t:"Las sociedades de responsabilidad limitada."}
  ], answer: "c" },
  { topic: "T2", question: "Las Sociedades Laborales:", options: [
    {l:"a", t:"Pueden tener socios no trabajadores."},
    {l:"b", t:"Tienen responsabilidad ilimitada sobre las deudas contraídas ante terceros."},
    {l:"c", t:"Tributan a través del impuesto sobre la renta de las personas físicas."}
  ], answer: "a" },
  { topic: "T2", question: "En las sociedades laborales:", options: [
    {l:"a", t:"Los trabajadores no pueden tener más del 49% del capital de la empresa."},
    {l:"b", t:"Los socios no pueden tener más del 70% del capital social."},
    {l:"c", t:"Al menos el 51% de capital tiene que pertenecer a socios trabajadores."}
  ], answer: "c" },
  { topic: "T2", question: "El empresario individual:", options: [
    {l:"a", t:"Tributa a través del Impuesto sobre la Renta de las Personas Físicas."},
    {l:"b", t:"Ha de tener un capital mínimo de 50.000 euros para iniciar su actividad."},
    {l:"c", t:"No puede contratar."}
  ], answer: "a" },
  { topic: "T2", question: "Según el criterio de forma jurídica, las empresas pueden clasificarse en:", options: [
    {l:"a", t:"Empresas públicas y privadas."},
    {l:"b", t:"Empresas individuales y sociedades."},
    {l:"c", t:"Empresas ordinarias y empresas específicas."}
  ], answer: "b" },
  { topic: "T2", question: "Una empresa que se dedica exclusivamente a la cría de caracoles pertenece al sector:", options: [
    {l:"a", t:"Primario."},
    {l:"b", t:"Secundario."},
    {l:"c", t:"Terciario."}
  ], answer: "a" },
  { topic: "T2", question: "Una empresa cuya actividad es la de reparación de vehículos pertenecería al sector:", options: [
    {l:"a", t:"Primario."},
    {l:"b", t:"Secundario."},
    {l:"c", t:"Terciario."}
  ], answer: "c" },
  { topic: "T2", question: "En las sociedades de capital:", options: [
    {l:"a", t:"Los socios aportan trabajo y capital."},
    {l:"b", t:"Los socios deciden en función del capital aportado."},
    {l:"c", t:"Los socios deciden en función del capital aportado pero los beneficios se reparten en función del trabajo realizado."}
  ], answer: "b" },
  { topic: "T2", question: "En la sociedad anónima:", options: [
    {l:"a", t:"Los administradores tienen que ser socios."},
    {l:"b", t:"Tiene como mínimo un socio."},
    {l:"c", t:"La responsabilidad de los socios es ilimitada."}
  ], answer: "b" },
  { topic: "T2", question: "En la Sociedad Limitada Laboral:", options: [
    {l:"a", t:"Lo más relevante es el hecho del socio trabajador."},
    {l:"b", t:"La responsabilidad de los socios es ilimitada."},
    {l:"c", t:"El capital está dividido en acciones."}
  ], answer: "a" },
  { topic: "T2", question: "Son características de la sociedad anónima:", options: [
    {l:"a", t:"Ser una combinación de sociedad personalista y capitalista."},
    {l:"b", t:"No tener personalidad jurídica."},
    {l:"c", t:"Su capital dividido en acciones, está integrado por las aportaciones de los socios."}
  ], answer: "c" },
  { topic: "T2", question: "Las sociedades de responsabilidad limitada (S.L.):", options: [
    {l:"a", t:"Tienen un solo socio."},
    {l:"b", t:"Los socios responden personalmente de las deudas sociales."},
    {l:"c", t:"El capital mínimo es de 3.000 euros."}
  ], answer: "c" },
  { topic: "T2", question: "Una cooperativa andaluza de segundo grado indica que:", options: [
    {l:"a", t:"Dos o más cooperativas se han agrupado formando una nueva cooperativa."},
    {l:"b", t:"Los productos fabricados son exclusivamente andaluces."},
    {l:"c", t:"La actividad que realiza es financiera, dando créditos a los socios cooperativos."}
  ], answer: "a" },
  { topic: "T2", question: "No es una sociedad capitalista:", options: [
    {l:"a", t:"Sociedad Anónima."},
    {l:"b", t:"Sociedad de Responsabilidad Limitada."},
    {l:"c", t:"Sociedad Colectiva."}
  ], answer: "c" },
  { topic: "T2", question: "El empresario individual:", options: [
    {l:"a", t:"La razón social (denominación social) es libre."},
    {l:"b", t:"Se exige un capital mínimo de 3.000 euros."},
    {l:"c", t:"No es obligatorio que se inscriba en el Registro Mercantil."}
  ], answer: "a" },
  { topic: "T2", question: "Las partes en las que se divide el capital de la sociedad limitada se denominan:", options: [
    {l:"a", t:"Acciones."},
    {l:"b", t:"Participaciones."},
    {l:"c", t:"Opciones."}
  ], answer: "b" },
  { topic: "T2", question: "Una empresa dedicada al cultivo de fresas pertenece al sector:", options: [
    {l:"a", t:"Primario."},
    {l:"b", t:"Secundario."},
    {l:"c", t:"Terciario."}
  ], answer: "a" },
  { topic: "T2", question: "Según su estructura jurídica, las empresas se clasifican en:", options: [
    {l:"a", t:"Grandes, pequeñas o medianas."},
    {l:"b", t:"Sector primario, sector secundario y sector terciario."},
    {l:"c", t:"Empresa individual y empresa de socios o sociedad."}
  ], answer: "c" },
  { topic: "T2", question: "¿Cuál de las siguientes sociedades no tiene ánimo de lucro?", options: [
    {l:"a", t:"La Sociedad Limitada."},
    {l:"b", t:"La Sociedad Anónima."},
    {l:"c", t:"La Cooperativa."}
  ], answer: "c" },
  { topic: "T2", question: "¿Cuál de las siguientes respuestas no es un órgano de las sociedades cooperativas?", options: [
    {l:"a", t:"Administradores."},
    {l:"b", t:"Consejo Rector."},
    {l:"c", t:"Asamblea General."}
  ], answer: "a" },
  { topic: "T2", question: "Los órganos principales de la Sociedad Limitada son:", options: [
    {l:"a", t:"La Junta General y el Consejo Rector."},
    {l:"b", t:"La Junta General y los Administradores."},
    {l:"c", t:"La Junta General y los Socios."}
  ], answer: "b" },
  { topic: "T2", question: "Las sociedades anónimas:", options: [
    {l:"a", t:"Deben poseer un capital máximo de 60.000 euros."},
    {l:"b", t:"Los socios responden personalmente de las deudas sociales."},
    {l:"c", t:"Poseen un capital dividido en acciones."}
  ], answer: "c" },
  { topic: "T2", question: "En las sociedades de responsabilidad limitada los socios responden de las deudas sociales:", options: [
    {l:"a", t:"Con la aportación realizada a la sociedad."},
    {l:"b", t:"Con la mitad de lo aportado a la sociedad."},
    {l:"c", t:"Con todo su patrimonio."}
  ], answer: "a" },
  { topic: "T2", question: "En las Sociedades de responsabilidad limitada:", options: [
    {l:"a", t:"Los socios no responden personalmente de las deudas."},
    {l:"b", t:"Los socios deben ser al menos tres personas físicas."},
    {l:"c", t:"La responsabilidad de los socios no se limita al capital aportado."}
  ], answer: "a" },
  { topic: "T2", question: "Una empresa tiene 1.000 acciones con un valor efectivo de 12 euros/acción y un valor nominal de 14 euros/acción. Podemos decir que:", options: [
    {l:"a", t:"Tiene un capital de 14.000 Euros."},
    {l:"b", t:"Tiene un capital de 12.000 Euros."},
    {l:"c", t:"Tiene un capital de 26.000 Euros."}
  ], answer: "a" },
  { topic: "T2", question: "TVE, S.A. es una empresa:", options: [
    {l:"a", t:"Pública y del sector secundario."},
    {l:"b", t:"Privada y del sector secundario."},
    {l:"c", t:"Pública y del sector terciario."}
  ], answer: "c" },
  { topic: "T2", question: "¿Cuál de las siguientes sociedades es una sociedad personalista?", options: [
    {l:"a", t:"Sociedad colectiva."},
    {l:"b", t:"Sociedad limitada."},
    {l:"c", t:"Sociedad civil pública."}
  ], answer: "a" },
  { topic: "T2", question: "¿Cuál de las siguientes NO es una sociedad de capital o sociedad capitalista?", options: [
    {l:"a", t:"Sociedad anónima."},
    {l:"b", t:"Sociedad limitada."},
    {l:"c", t:"Sociedad cooperativa."}
  ], answer: "c" },
  { topic: "T2", question: "En la constitución de las Sociedades anónimas debe estar desembolsado al menos:", options: [
    {l:"a", t:"Un 50% del capital suscrito."},
    {l:"b", t:"Un 25% del capital suscrito."},
    {l:"c", t:"Un 75% del capital suscrito."}
  ], answer: "b" },
  { topic: "T2", question: "Las Sociedades Laborales:", options: [
    {l:"a", t:"Deben tener socios trabajadores."},
    {l:"b", t:"Tienen responsabilidad ilimitada ante las deudas contraídas con terceros."},
    {l:"c", t:"Las dos anteriores son correctas."}
  ], answer: "a" },
  { topic: "T2", question: "En las Sociedades anónimas:", options: [
    {l:"a", t:"La responsabilidad de los socios es limitada al capital aportado."},
    {l:"b", t:"La responsabilidad de los socios no se limita al capital aportado."},
    {l:"c", t:"Los socios deben ser personas físicas."}
  ], answer: "a" },
  { topic: "T2", question: "La responsabilidad frente a las deudas es ilimitada en:", options: [
    {l:"a", t:"El empresario individual."},
    {l:"b", t:"Las sociedades anónimas."},
    {l:"c", t:"Las sociedades de responsabilidad limitada."}
  ], answer: "a" },
  { topic: "T2", question: "Las sociedades de responsabilidad limitada:", options: [
    {l:"a", t:"Tienen un solo socio."},
    {l:"b", t:"Los socios no responden personalmente de las deudas sociales."},
    {l:"c", t:"El capital mínimo es de 60.000 euros."}
  ], answer: "b" },
  { topic: "T2", question: "Una sociedad anónima laboral:", options: [
    {l:"a", t:"Puede tener además de socios trabajadores, socios no trabajadores."},
    {l:"b", t:"Tiene un máximo de 5 socios."},
    {l:"c", t:"La responsabilidad de los socios es ilimitada."}
  ], answer: "a" },
  { topic: "T2", question: "¿Cuál es el capital mínimo para constituir una sociedad anónima?", options: [
    {l:"a", t:"60.000 €."},
    {l:"b", t:"3.000 €."},
    {l:"c", t:"No hay mínimo."}
  ], answer: "a" },
  { topic: "T2", question: "Las siglas \"S.A.L.\" corresponden a:", options: [
    {l:"a", t:"Sociedad Anónima Limitada."},
    {l:"b", t:"Sociedad Anónima Laboral."},
    {l:"c", t:"Sociedad Andaluza Laboral."}
  ], answer: "b" },
  { topic: "T2", question: "La Sociedad Limitada:", options: [
    {l:"a", t:"Tiene un mínimo de dos socios."},
    {l:"b", t:"Tributa a través del Impuesto sobre la Renta de las Personas Físicas."},
    {l:"c", t:"Tiene su capital dividido en participaciones."}
  ], answer: "c" },
  { topic: "T2", question: "En una Sociedad limitada:", options: [
    {l:"a", t:"Hay que desembolsar totalmente el capital."},
    {l:"b", t:"Los administradores tienen que ser socios."},
    {l:"c", t:"Las participaciones son títulos negociables."}
  ], answer: "a" },
  { topic: "T2", question: "La empresa mixta es aquella empresa:", options: [
    {l:"a", t:"Que está formada por una empresa nacional y otra multinacional."},
    {l:"b", t:"Cuya propiedad está compartida entre el Estado y particulares."},
    {l:"c", t:"Ambas respuestas son correctas."}
  ], answer: "b" },
  { topic: "T2", question: "En las sociedades laborales:", options: [
    {l:"a", t:"El 20% del capital no puede estar en manos de un solo socio."},
    {l:"b", t:"El 51% del capital debe estar en manos de los socios trabajadores."},
    {l:"c", t:"Pueden ser colectivas o anónimas."}
  ], answer: "b" },
  { topic: "T2", question: "No es una sociedad capitalista:", options: [
    {l:"a", t:"La sociedad anónima."},
    {l:"b", t:"La sociedad limitada."},
    {l:"c", t:"La sociedad civil pública."}
  ], answer: "c" },
  { topic: "T2", question: "En las Sociedades Anónimas la responsabilidad de los socios es:", options: [
    {l:"a", t:"Limitada."},
    {l:"b", t:"Ilimitada."},
    {l:"c", t:"Subsidiaria e ilimitada."}
  ], answer: "a" },
  { topic: "T2", question: "Una empresa de 200 trabajadores:", options: [
    {l:"a", t:"Puede considerarse pequeña."},
    {l:"b", t:"Puede considerarse mediana."},
    {l:"c", t:"Puede considerarse grande."}
  ], answer: "b" },
  { topic: "T2", question: "¿Cuál de las siguientes afirmaciones es cierta?", options: [
    {l:"a", t:"Una Sociedad Laboral y una Sociedad Cooperativa tienen responsabilidad limitada."},
    {l:"b", t:"Una Sociedad Laboral y una Sociedad Cooperativa tienen responsabilidad ilimitada."},
    {l:"c", t:"Una Sociedad Cooperativa y una Sociedad Colectiva tienen responsabilidad ilimitada."}
  ], answer: "a" },
  { topic: "T2", question: "Las cooperativas:", options: [
    {l:"a", t:"Son sociedades sin ánimo de lucro."},
    {l:"b", t:"Sus socios no tienen por qué tener intereses o necesidades socio-económicas comunes."},
    {l:"c", t:"Son sociedades con carácter mercantil."}
  ], answer: "a" },
  { topic: "T2", question: "¿A qué se le denomina Dividendo Pasivo?", options: [
    {l:"a", t:"Al reparto de excedentes en una cooperativa."},
    {l:"b", t:"Al reparto de los beneficios de una S.A. o una S.L."},
    {l:"c", t:"A la parte pendiente de desembolsar del capital suscrito."}
  ], answer: "c" },
  { topic: "T2", question: "Señale la respuesta correcta:", options: [
    {l:"a", t:"El capital de una S.L. está dividido en acciones y no podrá ser inferior a 3.000 euros."},
    {l:"b", t:"En la S.A. el capital no podrá ser inferior a 60.000 euros y las aportaciones sólo podrán hacerse en dinero."},
    {l:"c", t:"Ninguna de las afirmaciones anteriores es correcta."}
  ], answer: "c" },
  { topic: "T2", question: "¿Cómo se toman las decisiones más importantes en una Sociedad Anónima?", options: [
    {l:"a", t:"Por votación de los socios. Cada socio tienen un voto."},
    {l:"b", t:"Por votación de los socios. Cada socio tiene votos en función del número de acciones que posea."},
    {l:"c", t:"Por decisión del Consejo de Administración."}
  ], answer: "b" },
  { topic: "T2", question: "Una sociedad anónima laboral:", options: [
    {l:"a", t:"No tiene por qué tener una actividad mercantil."},
    {l:"b", t:"Es suficiente con que el 25% de las acciones pertenezcan a trabajadores fijos."},
    {l:"c", t:"Ningún socio puede poseer acciones que representen más del 33% del capital social."}
  ], answer: "c" },
  { topic: "T2", question: "La responsabilidad limitada ante terceros se da en:", options: [
    {l:"a", t:"El empresario individual."},
    {l:"b", t:"Una sociedad colectiva."},
    {l:"c", t:"Una sociedad anónima laboral."}
  ], answer: "c" },
  { topic: "T2", question: "En el momento de constituir una sociedad anónima el capital social escriturado:", options: [
    {l:"a", t:"Ha de estar totalmente suscrito y totalmente desembolsado."},
    {l:"b", t:"Puede estar parcialmente suscrito y parcialmente desembolsado."},
    {l:"c", t:"Ha de estar totalmente suscrito pero puede estar parcialmente desembolsado."}
  ], answer: "c" },
  { topic: "T2", question: "El empresario individual es:", options: [
    {l:"a", t:"Una persona que ejerce el comercio habitualmente y que actúa en nombre propio."},
    {l:"b", t:"Una persona jurídica con capacidad de obrar."},
    {l:"c", t:"Una persona física cuyo único objetivo es ganar dinero."}
  ], answer: "a" },
  { topic: "T2", question: "En la constitución de una sociedad anónima:", options: [
    {l:"a", t:"Las aportaciones tienen que ser necesariamente en dinero."},
    {l:"b", t:"Hay que desembolsar totalmente el capital."},
    {l:"c", t:"Hay que inscribirla en el Registro Mercantil."}
  ], answer: "c" },
  { topic: "T2", question: "Al reparto de los beneficios de la sociedad se le denomina:", options: [
    {l:"a", t:"Dividendo activo."},
    {l:"b", t:"Dividendo pasivo."},
    {l:"c", t:"Reparto de excedentes."}
  ], answer: "a" },
  { topic: "T2", question: "Sociedad Cooperativa es aquella en que:", options: [
    {l:"a", t:"Los votos son función del capital social."},
    {l:"b", t:"Los beneficios se reparten entre los socios en función de su participación en la actividad."},
    {l:"c", t:"Se reparten los beneficios en función del capital social."}
  ], answer: "a" },
  { topic: "T2", question: "El empresario individual:", options: [
    {l:"a", t:"Debe ejercer de forma ocasional."},
    {l:"b", t:"Puede ser cualquier persona jurídica."},
    {l:"c", t:"Debe poseer capacidad legal necesaria."}
  ], answer: "c" },
  { topic: "T2", question: "Una característica de las cooperativas es:", options: [
    {l:"a", t:"Ser una empresa de interés social."},
    {l:"b", t:"Que se puede fundar con dos socios."},
    {l:"c", t:"Que su capital está dividido en acciones."}
  ], answer: "a" },
  { topic: "T2", question: "\"Una sociedad mercantil cuyo capital, dividido en acciones, está integrado por las aportaciones de los socios, quienes no responden personalmente de las deudas sociales\", ésta es la definición de:", options: [
    {l:"a", t:"Las sociedades de responsabilidad limitada."},
    {l:"b", t:"Las sociedades anónimas."},
    {l:"c", t:"Las sociedades cooperativas."}
  ], answer: "b" },
  { topic: "T2", question: "En una Sociedad Anónima, ¿a qué es igual el Capital Social?", options: [
    {l:"a", t:"Al número de acciones por el valor nominal de cada acción."},
    {l:"b", t:"Al número de obligaciones por el valor nominal de cada obligación."},
    {l:"c", t:"Al número de acciones por el valor de mercado de cada acción."}
  ], answer: "a" },
  { topic: "T2", question: "Una cooperativa de profesores que crea un colegio es de:", options: [
    {l:"a", t:"Primer grado."},
    {l:"b", t:"Segundo grado."},
    {l:"c", t:"Tercer grado."}
  ], answer: "a" },
  { topic: "T2", question: "¿Cuál de las siguientes sociedades es una sociedad personalista?", options: [
    {l:"a", t:"Sociedad Colectiva."},
    {l:"b", t:"Sociedad Anónima."},
    {l:"c", t:"Sociedad Limitada."}
  ], answer: "a" },
  { topic: "T2", question: "Para la toma de decisiones por los socios en una Sociedad Limitada:", options: [
    {l:"a", t:"Todos los socios tienen el mismo número de votos, de manera que las decisiones se toman por consenso."},
    {l:"b", t:"Cada socio dispone de un voto."},
    {l:"c", t:"Cada socio tiene un número de votos en función del número de participaciones que posea."}
  ], answer: "c" },
  { topic: "T2", question: "Las cooperativas se caracterizan por:", options: [
    {l:"a", t:"Ser sociedades de capital variable."},
    {l:"b", t:"Estar dirigidas por el Consejo de Administración."},
    {l:"c", t:"La responsabilidad de los socios frente a terceros es ilimitada."}
  ], answer: "a" },
  { topic: "T2", question: "En la sociedad limitada:", options: [
    {l:"a", t:"Los socios no responden de las deudas sociales con su patrimonio personal."},
    {l:"b", t:"Los socios responden de las deudas sociales con su patrimonio personal hasta un cierto límite."},
    {l:"c", t:"Ninguna de las respuestas anteriores es correcta."}
  ], answer: "a" },
  { topic: "T2", question: "El órgano de gobierno, gestión y representación de la cooperativa es:", options: [
    {l:"a", t:"La Asamblea General."},
    {l:"b", t:"El Consejo de Administración."},
    {l:"c", t:"El Consejo Rector."}
  ], answer: "c" },
  { topic: "T2", question: "En una Sociedad Cooperativa se llama retorno cooperativo a:", options: [
    {l:"a", t:"Los excedentes netos conseguidos por su actividad."},
    {l:"b", t:"Al ingreso de un nuevo socio cooperativo."},
    {l:"c", t:"A la participación de una empresa asociada que aporta capital."}
  ], answer: "a" },
  { topic: "T2", question: "Las S.A. se caracterizan por:", options: [
    {l:"a", t:"Su capital mínimo es de 60.000 €."},
    {l:"b", t:"Su capital está dividido en participaciones iguales."},
    {l:"c", t:"El número mínimo de socios es de dos."}
  ], answer: "a" },
  { topic: "T2", question: "La S.A.L. se diferencia entre otras cosas de la S.A. en:", options: [
    {l:"a", t:"La naturaleza de su actividad es lucrativa."},
    {l:"b", t:"Su capital social está dividido en participaciones que no se pueden denominar acciones."},
    {l:"c", t:"Como mínimo el 51% del capital social debe pertenecer a trabajadores indefinidos a tiempo completo."}
  ], answer: "c" },
  { topic: "T2", question: "En una S.A. el capital está:", options: [
    {l:"a", t:"Siempre dividido en acciones al portador."},
    {l:"b", t:"Siempre está dividido en acciones nominativas."},
    {l:"c", t:"Dividido en acciones nominativas o al portador."}
  ], answer: "c" },
  { topic: "T2", question: "En la Sociedad Limitada:", options: [
    {l:"a", t:"Los socios responden de las deudas sociales con su patrimonio personal hasta 3.000 €."},
    {l:"b", t:"Los socios responden de las deudas sociales de forma solidaria."},
    {l:"c", t:"Los socios no responden de las deudas sociales con su patrimonio personal."}
  ], answer: "c" },
  { topic: "T2", question: "Si se constituye una S.A. con un capital social inicial suscrito de 120.000 €, los socios fundadores tienen la obligación de desembolsar, como mínimo, en el momento de la constitución:", options: [
    {l:"a", t:"50.000 €."},
    {l:"b", t:"30.000 €."},
    {l:"c", t:"La totalidad del capital suscrito: 120.000 €."}
  ], answer: "b" },
  { topic: "T2", question: "¿Cuál de los siguientes tipos de sociedad es personalista?", options: [
    {l:"a", t:"Una sociedad anónima."},
    {l:"b", t:"Una sociedad comanditaria."},
    {l:"c", t:"Una sociedad limitada."}
  ], answer: "b" },
  { topic: "T2", question: "Las acciones son:", options: [
    {l:"a", t:"Fracciones del capital de una sociedad anónima."},
    {l:"b", t:"Fracciones de un derecho de suscripción preferente."},
    {l:"c", t:"Fracciones de un empréstito."}
  ], answer: "a" },
  { topic: "T2", question: "Las sociedades limitadas se caracterizan porque:", options: [
    {l:"a", t:"El capital está dividido en partes iguales denominadas participaciones sociales."},
    {l:"b", t:"La responsabilidad del socio es ilimitada."},
    {l:"c", t:"Un socio no puede tener más del 50% del capital."}
  ], answer: "a" },
  { topic: "T2", question: "Las empresas individuales se caracterizan por ser propiedad de:", options: [
    {l:"a", t:"Una persona física titular del patrimonio de la empresa."},
    {l:"b", t:"Un grupo financiero."},
    {l:"c", t:"Un colectivo de individuos que asumen los riesgos propios de la misma."}
  ], answer: "a" },
  { topic: "T2", question: "¿En cuál de estos tipos de empresas los socios tienen responsabilidad ilimitada?", options: [
    {l:"a", t:"Una Sociedad Cooperativa."},
    {l:"b", t:"Una Sociedad Anónima."},
    {l:"c", t:"Una Sociedad Civil."}
  ], answer: "c" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const shuffled = shuffle(questions);
const children = [];

// Title
children.push(new Paragraph({
  children: [new TextRun({ text: "BATERÍA DE PREGUNTAS TIPO TEST", bold: true, size: 32, font: "Arial" })],
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 }
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Temas 1 y 2 — Empresa y Diseño de Modelos de Negocio / Clases de Empresas", size: 22, font: "Arial", italics: true })],
  alignment: AlignmentType.CENTER,
  spacing: { after: 100 }
}));
children.push(new Paragraph({
  children: [new TextRun({ text: "Colegio Salesiano \"San Luis Rey\" — Bachillerato de Ciencias Sociales — Curso 2025/2026", size: 20, font: "Arial" })],
  alignment: AlignmentType.CENTER,
  spacing: { after: 400 }
}));

shuffled.forEach((q, i) => {
  const num = i + 1;
  children.push(new Paragraph({
    children: [
      new TextRun({ text: `${num}. `, bold: true, size: 22, font: "Arial" }),
      new TextRun({ text: q.question, size: 22, font: "Arial" })
    ],
    spacing: { before: 200, after: 60 }
  }));
  q.options.forEach(opt => {
    children.push(new Paragraph({
      children: [new TextRun({ text: `    ${opt.l}) ${opt.t}`, size: 20, font: "Arial" })],
      spacing: { after: 40 }
    }));
  });
});

// Page break before solutions
children.push(new Paragraph({
  children: [new TextRun({ text: "", size: 22 })],
  pageBreakBefore: true
}));

children.push(new Paragraph({
  children: [new TextRun({ text: "SOLUCIONES", bold: true, size: 28, font: "Arial" })],
  alignment: AlignmentType.CENTER,
  spacing: { after: 300 }
}));

const cols = 5;
for (let i = 0; i < shuffled.length; i += cols) {
  const row = shuffled.slice(i, i + cols);
  const text = row.map((q, j) => {
    const num = i + j + 1;
    return `${num}. ${q.answer.toUpperCase()}`;
  }).join("     ");
  children.push(new Paragraph({
    children: [new TextRun({ text, size: 20, font: "Arial" })],
    spacing: { after: 80 }
  }));
}

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 },
        margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 }
      }
    },
    children
  }]
});

Packer.toBuffer(doc).then(buffer => {
  const out = path.join(__dirname, '..', 'output', 'test_temas1y2_mezclado.docx');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, buffer);
  console.log('Archivo:', out);
  console.log('Done!', shuffled.length, 'questions');
});