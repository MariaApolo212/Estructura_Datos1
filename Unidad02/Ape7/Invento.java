package Unidad02.Ape7;

import java.util.Random;

public class Invento {

    public static void main(String[] args) {
        Random rnd = new Random(42);

        // ── 1. Pila (LIFO) — descarga del camión ─────────────────────────────
        System.out.println("=== PILA (descarga camión) ===");
        pilasPaquete pila = new pilasPaquete(5);
        for (int i = 1; i <= 5; i++) {
            Paquete p = new Paquete(i, rnd.nextInt(50) * 1000);
            pila.push(p);
            System.out.println("  Push → Paquete #" + p.getId()
                    + "  CP: " + p.getCodigoPostal());
        }
        System.out.println("--- Retirando de la pila ---");
        while (!pila.estaVacia()) {
            Paquete p = pila.pop();
            System.out.println("  Pop  → Paquete #" + p.getId()
                    + "  CP: " + p.getCodigoPostal());
        }

        // ── 2. Cola (FIFO) — despacho a rutas ────────────────────────────────
        System.out.println("\n=== COLA (despacho a clientes) ===");
        ColaPaquetes cola = new ColaPaquetes(5);
        rnd = new Random(42);
        for (int i = 1; i <= 5; i++) {
            Paquete p = new Paquete(i, rnd.nextInt(50) * 1000);
            cola.enqueue(p);
            System.out.println("  Enqueue → Paquete #" + p.getId()
                    + "  CP: " + p.getCodigoPostal());
        }
        System.out.println("--- Retirando de la cola ---");
        while (!cola.estaVacia()) {
            Paquete p = cola.dequeu();
            System.out.println("  Dequeue → Paquete #" + p.getId()
                    + "  CP: " + p.getCodigoPostal());
        }

        // ── 3. Ordenamiento con GestorRutas ──────────────────────────────────
        System.out.println("\n=== ORDENAMIENTO (QuickSort 10 paquetes) ===");
        Paquete[] ruta = new Paquete[10];
        rnd = new Random(7);
        for (int i = 0; i < 10; i++) {
            ruta[i] = new Paquete(i + 1, rnd.nextInt(50) * 1000);
        }
        System.out.println("Antes:");
        for (Paquete p : ruta)
            System.out.println("  Paquete #" + p.getId() + "  CP: " + p.getCodigoPostal());

        GestorRutas.quickSort(ruta, 0, ruta.length - 1);

        System.out.println("Después (ordenado por CP):");
        for (Paquete p : ruta)
            System.out.println("  Paquete #" + p.getId() + "  CP: " + p.getCodigoPostal());
    }
}
