package Unidad02.Ape7;

public class GestorRutas {

    // ── Burbuja ──────────────────────────────────────────────────────────────
    // O(n²) — aceptable para datos pequeños (< 5 000 elementos)
    public static void ordenar(Paquete[] datos) {
        int n = datos.length;
        for (int i = 0; i < n - 1; i++) {
            for (int j = 0; j < n - i - 1; j++) {
                if (datos[j].getCodigoPostal() > datos[j + 1].getCodigoPostal()) {
                    Paquete temp  = datos[j];
                    datos[j]      = datos[j + 1];
                    datos[j + 1]  = temp;
                }
            }
        }
    }

    // ── QuickSort ─────────────────────────────────────────────────────────────
    // O(n log n) promedio — recomendado para 50 000, 75 000 y 1 000 000 paquetes
    public static void quickSort(Paquete[] datos, int inicio, int fin) {
        if (inicio < fin) {
            int pivotIndex = particionar(datos, inicio, fin);
            quickSort(datos, inicio, pivotIndex - 1);
            quickSort(datos, pivotIndex + 1, fin);
        }
    }

    // Particiona el subarreglo alrededor del pivote (último elemento)
    private static int particionar(Paquete[] datos, int inicio, int fin) { 
        int pivote = datos[fin].getCodigoPostal();
        int i = inicio - 1;

        for (int j = inicio; j < fin; j++) {
            if (datos[j].getCodigoPostal() <= pivote) {
                i++;
                Paquete temp = datos[i];
                datos[i]     = datos[j];
                datos[j]     = temp;
            }
        }
        // Colocar el pivote en su posición correcta
        Paquete temp  = datos[i + 1];
        datos[i + 1]  = datos[fin];
        datos[fin]    = temp;
        return i + 1;
    }

    // ── Comparativa de rendimiento ────────────────────────────────────────────
    public static void main(String[] args) {
        int[] tamanos = {50_000, 75_000, 1_000_000};
        java.util.Random rnd = new java.util.Random(42);

        System.out.printf("%-15s %-20s %-20s%n",
                "Tamaño", "Burbuja (ms)", "QuickSort (ms)");
        System.out.println("-".repeat(57));

        for (int n : tamanos) {
            // Generar datos aleatorios
            Paquete[] datosBurbuja    = new Paquete[n];
            Paquete[] datosQuickSort  = new Paquete[n];
            for (int i = 0; i < n; i++) {
                int cp = rnd.nextInt(500_000);
                datosBurbuja[i]   = new Paquete(i, cp);
                datosQuickSort[i] = new Paquete(i, cp);
            }

            // Medir Burbuja (omitir para 1 M — demasiado lento)
            long tiempoBurbuja = -1;
            if (n <= 75_000) {
                long t0 = System.currentTimeMillis();
                ordenar(datosBurbuja);
                tiempoBurbuja = System.currentTimeMillis() - t0;
            }

            // Medir QuickSort
            long t0 = System.currentTimeMillis();
            quickSort(datosQuickSort, 0, n - 1);
            long tiempoQuick = System.currentTimeMillis() - t0;

            String burbuja = (tiempoBurbuja == -1) ? "muy lento" : tiempoBurbuja + " ms";
            System.out.printf("%-15d %-20s %-20s%n", n, burbuja, tiempoQuick + " ms");
        }
    }
}
