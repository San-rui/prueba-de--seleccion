# Prueba de selección para puesto de programador javascript
## Este proyecto fue realizado con 
- REACT. JS
- node 15.14
- 
## Deploy:

https://san-rui.github.io/prueba-de-seleccion/

## INTERFAZ GRÁFICA:

- En el “Current status” se muestra la hora, la temperatura y la energía actual. La hora se actualiza a cada segundo y tanto la temperatura como la energía se actualizan cada 5 segundos. 
- El gráfico que muestra la energía en función de la temperatura con un intervalo de tiempo de un minuto.
## INTERPRETACION DE LOS DATOS:

Las unidades de los datos iniciales fueron dk (deci kelvin) y MW (megawatts). En el caso de la unidad de energía, he utilizado megawatts y no milliwatts dado que ambas letras estaban en mayúscula. Investigue y para ser considerado milliwatts debería haber sido mW.
  
   - Pasaje de unidades temperatura => ºC=(dk))*0.1-273
   - Pasaje de unidades energía => KW =(MW)*1000
       Dado que la energía cambiaba cada 5 segundos y que no se apreciaba un incremento respecto al valor anterior, se utilizó el criterio de que la energía dada corresponde a la energía producida en 5 segundos con lo cual para pasar de KW a KW/h se realizó la siguiente cuenta: ((KW)*3600)/5)

## INTERPRETACION DE LA CONSIGNA:  

Para realizar el gráfico he interpretado que debía ser un solo gráfico que mostrase la energía en función de la temperatura con un intervalo de tiempo de un minuto. Lo cual se traduce que cada minuto el gráfico se actualizará automáticamente.




