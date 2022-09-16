export type Cell = React.ReactNode;
export type ColumnHeader = {
	cell: Cell;
	layout?: 'stretch' | 'compress';
};
export type TableProps = {
	headers?: ColumnHeader[];
	rows: Cell[][];
	headerInvis?: boolean;
};
export default function Table({ headers, rows, headerInvis }: TableProps) {
	return (
		<table className="w-full">
			<thead>
				<tr className={`sticky top-0`}>
					{headers?.map(({ cell, layout }, headerIndex) => {
						return (
							<th key={headerIndex} className={` bg-white ${layout === 'compress' ? 'w-1 whitespace-nowrap' : ''}`}>
								{cell}
							</th>
						);
					})}
				</tr>
			</thead>
			<tbody>
				{rows.map((row, index) => {
					return (
						<tr key={index} className="border-b">
							{row.map((cell, cellIndex) => {
								return (
									<td key={cellIndex} className={`h-full border-l`}>
										{cell}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}
