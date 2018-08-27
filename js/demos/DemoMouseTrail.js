import { h } from 'preact'
import { Base, Container, Graphics, Rope } from 'preact-pixi'

export default class DemoMouseTrail extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('trail', 'https://pixijs.io/examples/required/assets/trail.png')
        .load(evt => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        const { renderer } = this.props.root
        let mouseposition = renderer.plugins.interaction.mouse.global
        
        this.historyX.pop()
        this.historyX.unshift(mouseposition.x)
        this.historyY.pop()
        this.historyY.unshift(mouseposition.y)

        this.points.forEach((point, i) =>
        {
            point.x = this.CubicInterpolation(this.historyX, i / this.ropeSize * this.historySize)
            point.y = this.CubicInterpolation(this.historyY, i / this.ropeSize * this.historySize)
        })
    }

    ClipInput(k, arr)
    {
        if (k < 0)
            k = 0
        if (k > arr.length - 1)
            k = arr.length - 1
        return arr[k]
    }
    
    GetTangent(k, factor, array)
    {
        return factor * (this.ClipInput(k + 1, array) - this.ClipInput(k - 1,array)) / 2
    }
    
    CubicInterpolation(array, t, tangentFactor)
    {
        if (tangentFactor == null) tangentFactor = 1
        
        var k = Math.floor(t)
        var m = [this.GetTangent(k, tangentFactor, array), this.GetTangent(k + 1, tangentFactor, array)]
        var p = [this.ClipInput(k,array), this.ClipInput(k+1,array)]
        t -= k
        var t2 = t * t
        var t3 = t * t2
        return (2 * t3 - 3 * t2 + 1) * p[0] + (t3 - 2 * t2 + t) * m[0] + ( -2 * t3 + 3 * t2) * p[1] + (t3 - t2) * m[1]
    }

    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        this.BindUpdate()
    }

    render()
    {
        this.historySize = 20
        this.historyX = [...Array(this.historySize)]
        this.historyY = [...Array(this.historySize)]

        this.ropeSize = 100
        this.points = [...Array(this.ropeSize)].map((_, i) => new PIXI.Point(0, 0))
        
        return (
            <Container>
                <Rope texture={this.loader.resources['trail'].texture} points={this.points} blendmode={PIXI.BLEND_MODES.ADD} />
            </Container>
        )
    }
}
