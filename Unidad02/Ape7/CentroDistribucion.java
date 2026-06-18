package Unidad02.Ape7;

import java.util.ArrayList;
import java.util.Random;

/**
 * Siguiendo al ing
 * @author bluebul
 */
public class CentroDistribucion {
    private ArrayList<Paquete> inventario;

    public CentroDistribucion() {
        this.inventario = new ArrayList<>();
    }

    // Estructura LIFO - cuando descargan del camión
    public void recibirCajaCmion(Paquete p) { //agrega paquete al inventario simula descarga lifo 
        this.inventario.add(p);
    }

    // Despachar al cliente - LIFO: último en llegar, primero en salir
    public Paquete despacharACliente() { //retira el ultimo paquete (lifo con arraylist) retorna null si vacio
        if (!this.inventario.isEmpty()) {
            return this.inventario.remove(this.inventario.size() - 1);
        }
        return null;
    }

    // Limpiar inventario entre pruebas
    public void limpiar() { // vacia completamente el inventario con inventario.clear()
        this.inventario.clear(); // El unico metodo limpiar() de todo el proyecto esta en CentroDistribucion y llama a this.inventario.clear(). Ni pilasPaquete Ni ColaPaquetes tienen un metodod limpiar()
    }

    // ── Ordenamiento Burbuja O(n²) ────────────────────────────────────────────
    public void ordenarRutaBurbuja() { //ordena el inventario por codigo postal. Bubuja O(n2)
        int n = this.inventario.size();
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (this.inventario.get(j).getCodigoPostal()
                        > this.inventario.get(j + 1).getCodigoPostal()) {
                    Paquete temp = this.inventario.get(j);
                    this.inventario.set(j, this.inventario.get(j + 1));
                    this.inventario.set(j + 1, temp);
                }
            }
        }
    }

    // ── Ordenamiento QuickSort O(n log n) ─────────────────────────────────────
    public void ordenarRutaQuickSort() { // Ordena el inventario. Quicksort O(n log n)
        quickSort(this.inventario, 0, this.inventario.size() - 1);
    }

    private void quickSort(ArrayList<Paquete> lista, int inicio, int fin) {
        if (inicio < fin) {
            int pivotIndex = particionar(lista, inicio, fin);
            quickSort(lista, inicio, pivotIndex - 1);
            quickSort(lista, pivotIndex + 1, fin);
        }
    }

    private int particionar(ArrayList<Paquete> lista, int inicio, int fin) {
        int pivote = lista.get(fin).getCodigoPostal();
        int i = inicio - 1;
        for (int j = inicio; j < fin; j++) {
            if (lista.get(j).getCodigoPostal() <= pivote) {
                i++;
                Paquete temp = lista.get(i);
                lista.set(i, lista.get(j));
                lista.set(j, temp);
            }
        }
        Paquete temp = lista.get(i + 1);
        lista.set(i + 1, lista.get(fin));
        lista.set(fin, temp);
        return i + 1;
    }

    // ── Método auxiliar: cargar N paquetes con códigos postales aleatorios ────
    private static void cargarPaquetes(CentroDistribucion centro, int n, Random rnd) {
        for (int i = 0; i < n; i++) {
            int id          = i + 1;                       // FIX: antes siempre era 1
            int codigoPostal = rnd.nextInt(500_000);
            centro.recibirCajaCmion(new Paquete(id, codigoPostal));
        }
    }

    // ── Método auxiliar: medir y mostrar tiempo ───────────────────────────────
    private static String medirTiempo(Runnable accion) {
        long inicio = System.currentTimeMillis();
        accion.run();
        long fin = System.currentTimeMillis();
        return (fin - inicio) + " ms";
    }

    // ── MAIN ──────────────────────────────────────────────────────────────────
    public static void main(String[] args) {
        CentroDistribucion centro = new CentroDistribucion();
        Random random = new Random(42);

        // ── Prueba base: 1 000 paquetes ───────────────────────────────────────
        System.out.println("════════════════════════════════════════════════════");
        System.out.println("  PRUEBA BASE — 1 000 paquetes");
        System.out.println("════════════════════════════════════════════════════");

        cargarPaquetes(centro, 1_000, random);
        System.out.println("Paquetes cargados: 1 000");

        String t1000 = medirTiempo(centro::ordenarRutaBurbuja);
        System.out.println("Tiempo Burbuja (1 000):   " + t1000);

        System.out.println("Despachando los 5 primeros paquetes en orden:");
        for (int i = 0; i < 5; i++) {
            Paquete p = centro.despacharACliente();
            if (p != null) System.out.println("  Entregado: " + p);
        }

        // ── Comparativa: 50 000 / 75 000 / 1 000 000 ─────────────────────────
        System.out.println("\n════════════════════════════════════════════════════");
        System.out.println("  COMPARATIVA DE ALGORITMOS DE ORDENAMIENTO");
        System.out.println("════════════════════════════════════════════════════");
        System.out.printf("%-12s  %-18s  %-18s%n", "Tamaño", "Burbuja O(n²)", "QuickSort O(nlogn)");
        System.out.println("─".repeat(52));

        int[] tamanos = {50_000, 75_000, 1_000_000};

        for (int n : tamanos) {
            random = new Random(42);

            // -- Burbuja (solo para 50k y 75k; a 1M sería demasiado lento) --
            String tiempoBurbuja;
            if (n <= 75_000) {
                centro.limpiar();
                cargarPaquetes(centro, n, random);
                tiempoBurbuja = medirTiempo(centro::ordenarRutaBurbuja);
            } else {
                tiempoBurbuja = "demasiado lento";
            }

            // -- QuickSort --
            random = new Random(42);
            centro.limpiar();
            cargarPaquetes(centro, n, random);
            String tiempoQuick = medirTiempo(centro::ordenarRutaQuickSort);

            System.out.printf("%-12s  %-18s  %-18s%n",
                    String.format("%,d", n), tiempoBurbuja, tiempoQuick);
        }

        // ── Conclusión ────────────────────────────────────────────────────────
        System.out.println("\n════════════════════════════════════════════════════");
        System.out.println("  CONCLUSIÓN");
        System.out.println("════════════════════════════════════════════════════");
        System.out.println("• Burbuja O(n²): aceptable solo para pocos datos (< 5 000).");
        System.out.println("  A 50k y 75k ya es notablemente más lento que QuickSort.");
        System.out.println("  A 1 000 000 de paquetes sería inviable (horas de espera).");
        System.out.println("• QuickSort O(n log n): óptimo para los 3 volúmenes.");
        System.out.println("  Ordena 1 millón de paquetes en pocos segundos.");
        System.out.println("• Para el envío ordenado de paquetes se recomienda");
        System.out.println("  ordenar primero con QuickSort y luego desencolar");
        System.out.println("  con ColaPaquetes (FIFO) para respetar el orden de entrega.");
    }
}