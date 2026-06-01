import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import type { TableData } from '@/lib/types';

export default function ComplexityTable({ data }: { data: TableData }) {
  return (
    <div className="overflow-x-auto my-4 rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {data.headers.map((h, i) => (
              <TableHead key={i} className="text-xs font-semibold">{h}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j} className="text-sm font-mono">{cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
