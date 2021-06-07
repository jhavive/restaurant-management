export const topRoundedColumn = (x, y, height, width) => {
    const radius = width / 2;
    const heightBeforeArc = height - radius;
    return (
        `M${x},${y} ` + // Mx,y Move the pen to(x, y)
        `v-${height - radius} ` + // h<length> Draw a vertical line of length <height>px
        `a ${radius},${radius} 0 0 1 ${radius},-${radius} ` + // arc
        `a ${radius},${radius} 0 0 1 ${radius},${radius} ` +
        `v${height - radius} ` +
        `z` // close shape
    );
}