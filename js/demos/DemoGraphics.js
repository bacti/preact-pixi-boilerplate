import { h, render, Component } from 'preact'
import { Base, Container, Text, Sprite, JAnimation, Graphics } from 'preact-pixi'

class MovingShape extends Graphics
{
    Update(deltaTime)
    {
        const { graphics } = this.objects
        graphics.clear()
        graphics.lineStyle(10, 0xff0000, 1)
        graphics.beginFill(0xffFF00, 0.5)

        graphics.moveTo(-120 + Math.sin(this.count) * 20, -100 + Math.cos(this.count)* 20)
        graphics.lineTo( 120 + Math.cos(this.count) * 20, -100 + Math.sin(this.count)* 20)
        graphics.lineTo( 120 + Math.sin(this.count) * 20, 100 + Math.cos(this.count)* 20)
        graphics.lineTo( -120 + Math.cos(this.count)* 20, 100 + Math.sin(this.count)* 20)
        graphics.lineTo( -120 + Math.sin(this.count) * 20, -100 + Math.cos(this.count)* 20)

        graphics.rotation = this.count * 0.1
        this.count += 0.1
    }

    componentDidMount()
    {
        this.BindUpdate()
    }

    render()
    {
        this.count = 0
        return <Graphics object='graphics' />
    }
}

export default class GraphicsDemo extends Base
{
    constructor()
    {
        super()
        this.currentTime = 0
    }

    OnClick()
    {
        const { graphics } = this.objects
        graphics.lineStyle(Math.random() * 30, Math.random() * 0xFFFFFF, 1)
        graphics.moveTo(Math.random() * 800, Math.random() * 600)
        graphics.bezierCurveTo(
            Math.random() * 800, Math.random() * 600,
            Math.random() * 800, Math.random() * 600,
            Math.random() * 800, Math.random() * 600
        )
    }

    render()
    {
        return (
            <Container>
                <Graphics object='graphics'>
                    <Graphics.Point color={[0xFF3300]} style={[10, 0xffd900, 1]} x={50} y={50} />
                    <Graphics.Line x={250} y={50} />
                    <Graphics.Line x={100} y={100} />
                    <Graphics.Line x={250} y={220} />
                    <Graphics.Line x={50} y={220} />
                    <Graphics.Line x={50} y={50} />
                    <Graphics.Point color={[0xFF700B, 1]} style={[10, 0xFF0000, 0.8]} x={210} y={300} />
                    <Graphics.Line x={450} y={320} />
                    <Graphics.Line x={570} y={350} />
                    <Graphics.QuadraticCurve cpX={600} cpY={0} toX={480} toY={100} />
                    <Graphics.Line x={330} y={120} />
                    <Graphics.Line x={410} y={200} />
                    <Graphics.Line endFill x={210} y={300} />
                    <Graphics.Rect style={[2, 0x0000FF, 1]} x={50} y={250} width={100} height={100} />
                    <Graphics.Circle endFill color={[0xFFFF0B, 0.5]} style={[0]} x={470} y={200} radius={100} />
                    <Graphics.Point style={[20, 0x33FF00]} x={30} y={30} />
                    <Graphics.Line x={600} y={300} />
                </Graphics>
                <MovingShape position={[800/2,600/2]} onClick={ _ => this.OnClick()} />
            </Container>
        )
    }
}
