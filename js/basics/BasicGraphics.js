import { h } from 'preact'
import { Base, Container, Graphics } from 'preact-pixi'

export default class BasicGraphics extends Base
{
    render()
    {
        return (
            <Container>
                <Graphics>
                    <Graphics.Point color={[0xFF3300]} style={[4, 0xffd900, 1]} x={50} y={50} />
                    <Graphics.Line x={250} y={50} />
                    <Graphics.Line x={100} y={100} />
                    <Graphics.Line x={50} y={50} />
                    <Graphics.Rect color={[0xFF700B, 1]} style={[2, 0x0000FF, 1]} x={50} y={250} width={120} height={120} />
                    <Graphics.RoundedRect color={[0xFF00BB, 0.25]} style={[2, 0xFF00FF, 1]} x={150} y={450} width={300} height={100} radius={15} />
                    <Graphics.Circle color={[0xFFFF0B, 0.5]} style={[0]} x={470} y={90} radius={60} />
                </Graphics>
            </Container>
        )
    }
}
