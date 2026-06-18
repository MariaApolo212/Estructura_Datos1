package Unidad02.Ape7;

import java.util.ArrayList;
import java.util.Random;

public class CentroDistribucion {
    private ArrayList<Paquete> inventario;

    public CentroDistribucion() {
        this.inventario = new ArrayList<>();
    }

    public void recibirCajaCmion(Paquete p) {
        this.inventario.add(p);
    }

    public Paquete despacharACliente() {
        if (!this.inventario.isEmpty()) {
            return this.inventario.remove(this.inventario.size() - 1);
        }
        return null;
    }

    public void limpiar() {
        this.inventario.clear();
    }

    public void ordenarRutaBurbuja() {
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

    public void ordenarRutaQuickSort() {
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

    public int buscarLineal(int id) {
        for (int i = 0; i < inventario.size(); i++) {
            if (inventario.get(i).getId() == id) return i;
        }
        return -1;
    }

    public int buscarBinario(int id) {
        if (!inventarioOrdenado()) {
            throw new IllegalStateException(
                "El inventario debe estar ordenado por id antes de usar búsqueda binaria.");
        }
        int bajo = 0, alto = inventario.size() - 1;
        while (bajo <= alto) {
            int medio = bajo + (alto - bajo) / 2;
            int midId = inventario.get(medio).getId();
            if (midId == id)   return medio;
            if (midId < id)    bajo  = medio + 1;
            else               alto  = medio - 1;
        }
        return -1;
    }

    private boolean inventarioOrdenado() {
        for (int i = 0; i < inventario.size() - 1; i++) {
            if (inventario.get(i).getId() > inventario.get(i + 1).getId()) return false;
        }
        return true;
    }

    public void ordenarPorId() {
        inventario.sort((a, b) -> Integer.compare(a.getId(), b.getId()));
    }

    private static void cargarPaquetes(CentroDistribucion centro, int n, Random rnd) {
        for (int i = 0; i < n; i++) {
            int id          = i + 1;
            int codigoPostal = rnd.nextInt(500_000);
            centro.recibirCajaCmion(new Paquete(id, codigoPostal));
        }
    }

    private static String medirTiempo(Runnable accion) {
        long inicio = System.currentTimeMillis();
        accion.run();
        long fin = System.currentTimeMillis();
        return (fin - inicio) + " ms";
    }

    public static void main(String[] args) {
        CentroDistribucion centro = new CentroDistribucion();
        Random random = new Random(42);

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

        System.out.println("\n════════════════════════════════════════════════════");
        System.out.println("  COMPARATIVA DE ALGORITMOS DE ORDENAMIENTO");
        System.out.println("════════════════════════════════════════════════════");
        System.out.printf("%-12s  %-18s  %-18s%n", "Tamaño", "Burbuja O(n²)", "QuickSort O(nlogn)");
        System.out.println("─".repeat(52));

        int[] tamanos = {50_000, 75_000, 1_000_000};

        for (int n : tamanos) {
            random = new Random(42);

            String tiempoBurbuja;
            if (n <= 75_000) {
                centro.limpiar();
                cargarPaquetes(centro, n, random);
                tiempoBurbuja = medirTiempo(centro::ordenarRutaBurbuja);
            } else {
                tiempoBurbuja = "demasiado lento";
            }

            random = new Random(42);
            centro.limpiar();
            cargarPaquetes(centro, n, random);
            String tiempoQuick = medirTiempo(centro::ordenarRutaQuickSort);

            System.out.printf("%-12s  %-18s  %-18s%n",
                    String.format("%,d", n), tiempoBurbuja, tiempoQuick);
        }

        System.out.println("\n════════════════════════════════════════════════════");
        System.out.println("  CONCLUSIÓN ORDENAMIENTO");
        System.out.println("════════════════════════════════════════════════════");
        System.out.println("• Burbuja O(n²): aceptable solo para pocos datos (< 5 000).");
        System.out.println("  A 50k y 75k ya es notablemente más lento que QuickSort.");
        System.out.println("  A 1 000 000 de paquetes sería inviable (horas de espera).");
        System.out.println("• QuickSort O(n log n): óptimo para los 3 volúmenes.");
        System.out.println("  Ordena 1 millón de paquetes en pocos segundos.");
        System.out.println("• Para el envío ordenado de paquetes se recomienda");
        System.out.println("  ordenar primero con QuickSort y luego desencolar");
        System.out.println("  con ColaPaquetes (FIFO) para respetar el orden de entrega.");

        System.out.println("\n════════════════════════════════════════════════════");
        System.out.println("  SIMULACIÓN DE BÚSQUEDA — 10 000 paquetes");
        System.out.println("════════════════════════════════════════════════════");

        final int N = 10_000;
        CentroDistribucion centroBusq = new CentroDistribucion();
        Random rndBusq = new Random(42);
        cargarPaquetes(centroBusq, N, rndBusq);

        int idObjetivo = N;
        System.out.println("ID buscado: " + idObjetivo);

        long t0 = System.nanoTime();
        int resLineal = centroBusq.buscarLineal(idObjetivo);
        long tiempoLineal = System.nanoTime() - t0;

        System.out.printf("%nBúsqueda Lineal O(n):%n");
        System.out.println("  Índice encontrado : " + resLineal);
        System.out.printf ("  Tiempo            : %.6f s%n", tiempoLineal / 1e9);

        t0 = System.nanoTime();
        centroBusq.ordenarPorId();
        long tiempoOrden = System.nanoTime() - t0;

        System.out.printf("%nOrdenamiento previo (QuickSort por id):%n");
        System.out.printf("  Tiempo: %.6f s%n", tiempoOrden / 1e9);

        t0 = System.nanoTime();
        int resBinario = centroBusq.buscarBinario(idObjetivo);
        long tiempoBinario = System.nanoTime() - t0;

        System.out.printf("%nBúsqueda Binaria O(log n):%n");
        System.out.println("  Índice encontrado : " + resBinario);
        System.out.printf ("  Tiempo búsqueda   : %.6f s%n", tiempoBinario / 1e9);
        System.out.printf ("  Tiempo total      : %.6f s%n", (tiempoOrden + tiempoBinario) / 1e9);

        System.out.println("\n════════════════════════════════════════════════════");
        System.out.println("  TABLA COMPARATIVA DE BÚSQUEDA (10 000 paquetes)");
        System.out.println("════════════════════════════════════════════════════");
        System.out.printf("%-38s %-15s%n", "Operación", "Tiempo (s)");
        System.out.println("─".repeat(55));
        System.out.printf("%-38s %.6f%n", "Búsqueda Lineal  O(n)",         tiempoLineal  / 1e9);
        System.out.printf("%-38s %.6f%n", "Ordenamiento     O(n log n)",   tiempoOrden   / 1e9);
        System.out.printf("%-38s %.6f%n", "Búsqueda Binaria O(log n)",     tiempoBinario / 1e9);
        System.out.printf("%-38s %.6f%n", "Total Binaria  (orden+búsq)",   (tiempoOrden + tiempoBinario) / 1e9);
    }
}