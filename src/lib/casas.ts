import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

export interface Casa {
  id: number;
  modelo: string;
  superficie_m2: number;
  dormitorios: number;
  banos: number;
  precio: number;
  precio_texto: string;
  descripcion: string;
  imagen: string;
  url_imagen: string;
  plano: string;
}

function fmtPrecio(precio: number): string {
  if (precio === 0) return 'Consultar precio';
  return '$' + precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function cleanPrecio(val: unknown): number {
  if (val === undefined || val === null || val === '') return 0;
  const str = String(val).replace(/[$.,\s]/g, '');
  const n = parseInt(str, 10);
  return isNaN(n) ? 0 : n;
}

let _casas: Casa[] | null = null;

export function getCasas(): Casa[] {
  if (_casas !== null) return _casas;

  // Rutas candidatas para el archivo Excel (en orden de prioridad)
  const candidates = [
    path.resolve(process.cwd(), '..', 'Casaslivinghouse', 'assets', 'Catálogo .xlsx'),
    path.resolve(process.cwd(), 'src', 'data', 'Catálogo .xlsx'),
    path.resolve(process.cwd(), 'public', 'Catálogo .xlsx'),
  ];

  const excelPath = candidates.find(p => fs.existsSync(p));
  if (!excelPath) {
    console.error('❌ No se encontró el archivo Excel. Rutas probadas:');
    candidates.forEach(p => console.error('  -', p));
    return (_casas = []);
  }

  try {
    const fileBuffer = fs.readFileSync(excelPath);
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
    const sheet = workbook.Sheets['Hoja 1'];
    if (!sheet) {
      console.error('❌ No se encontró la hoja "Hoja 1"');
      return (_casas = []);
    }

    const rawRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(sheet);

    // Normalizar nombres de columnas (eliminar espacios extra)
    const rows = rawRows.map(row => {
      const normalized: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(row)) {
        normalized[key.trim()] = value;
      }
      return normalized;
    });

    _casas = rows
      .filter(row => row['id'] !== undefined && row['id'] !== null && row['id'] !== '')
      .map(row => {
        const id = parseInt(String(row['id']), 10);
        if (isNaN(id)) return null;

        const superficie_m2 = parseInt(String(row['superficie(m2)'] ?? 0), 10) || 0;
        const dormitorios = parseInt(String(row['dormitorios'] ?? 1), 10) || 1;
        const banos = parseInt(String(row['baños'] ?? 1), 10) || 1;
        const precio = cleanPrecio(row['precio']);

        return {
          id,
          modelo: String(row['modelo'] || 'Modelo desconocido'),
          superficie_m2,
          dormitorios,
          banos,
          precio,
          precio_texto: fmtPrecio(precio),
          descripcion: String(row['descripción'] || 'Sin descripción disponible'),
          imagen: String(row['imagen'] || ''),
          url_imagen: String(row['url_imagen'] || '/casaslivinghouse.jpg'),
          plano: String(row['plano'] || ''),
        } as Casa;
      })
      .filter((c): c is Casa => c !== null);

    console.log(`✅ Cargadas ${_casas.length} casas desde Excel`);
    return _casas;
  } catch (err) {
    console.error('❌ Error cargando casas:', err);
    return (_casas = []);
  }
}

export function getCasa(id: number): Casa | undefined {
  return getCasas().find(c => c.id === id);
}
