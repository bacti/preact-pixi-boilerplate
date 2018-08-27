import { h } from 'preact'
import { Base, Container, Graphics, Rope } from 'preact-pixi'

export default class BasicTexturedMesh extends Base
{
    Update(deltaTime)
    {
        this.count += 0.1
        this.points.forEach((point, i) =>
        {
            point.y = Math.sin((i * 0.5) + this.count) * 30
            point.x = i * this.ropeLength + Math.cos((i * 0.3) + this.count) * 20
        })
        this.RenderPoints()
    }

    RenderPoints()
    {
        const { g } = this.objects
        g.clear()
        g.lineStyle(2, 0xffc2c2)
        g.moveTo(this.points[0].x, this.points[0].y)
        this.points.forEach(point => g.lineTo(point.x, point.y))
        this.points.forEach(point =>
        {
            g.beginFill(0xff0022)
            g.drawCircle(point.x, point.y, 10)
            g.endFill()
        })
    }

    componentDidMount()
    {
        this.BindUpdate()
    }

    render()
    {
        this.ropeLength = 45
        this.points = [...Array(25)].map((_, i) => new PIXI.Point(i * this.ropeLength, 0))
        this.count = 0
        
        return (
            <Container>
                <Container position={[-40,300]}>
                    <Rope texture={PIXI.Texture.fromImage('https://pixijs.io/examples/required/assets/snake.png')} points={this.points} />
                    <Graphics object='g' />
                </Container>
            </Container>
        )
    }
}
