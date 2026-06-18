package Unidad02.Ape7;

/**
 * Siguiendo al Ingeniero
 * Asignatura: Estructura de Datos
 * @author bluebul
 */
public class Paquete {
    private int id;
    private int codigoPostalDestino;

    public Paquete(int id, int codigoPostalDestino) { // dos atributos
        this.id = id;                                 //crea un paquete con su id y codigo postal
        this.codigoPostalDestino = codigoPostalDestino;
    }

    public int getId()           { return id; } //metodos devuelve el id del paquete
    public int getCodigoPostal() { return codigoPostalDestino; } //devuelve el codigo postal destino este es el campo que usa el ordenamiento 

    // Representación legible del paquete para imprimir
    @Override
    public String toString() { //otro metodo este devuelve texto 
        return "Paquete{id=" + id + ", codigoPostal=" + codigoPostalDestino + "}";
    }
}