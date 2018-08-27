import { h } from 'preact'
import { Base, Container, Sprite, Graphics, Text } from 'preact-pixi'

const REEL_WIDTH = 160
const SYMBOL_SIZE = 150

var tweening = []
function tweenTo(object, property, target, time, easing, onchange, oncomplete)
{
    var tween =
    {
		object: object,
		property: property,
		propertyBeginValue: object[property],
		target: target,
		easing: easing,
		time: time,
		change: onchange,
		complete: oncomplete,
		start: Date.now(),
	}
	tweening.push(tween)
	return tween
}

function lerp(a1, a2, t)
{
	return a1 * (1 - t) + a2 * t
}

function backout(amount)
{
    return function(t) {
        return (--t * t * ((amount + 1) * t + amount) + 1)
    }
}

export default class DemoSlots extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('eggHead', 'https://pixijs.io/examples/required/assets/eggHead.png', { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR })
        .add('flowerTop', 'https://pixijs.io/examples/required/assets/flowerTop.png', { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR })
        .add('helmlok', 'https://pixijs.io/examples/required/assets/helmlok.png', { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR })
        .add('skully', 'https://pixijs.io/examples/required/assets/skully.png', { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR })
        .load( _ => this.setState({ textures: true }))
    }

    Update(deltaTime)
    {
        let now = Date.now()
        let toremove = []
        tweening.forEach(t =>
        {
            let phase = Math.min(1, (now - t.start) / t.time)
            t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase))
            t.change && t.change(t)
            if (phase == 1)
            {
                t.object[t.property] = t.target
                t.complete && t.complete(t)
                toremove.push(t)
            }
        })
        toremove.forEach(tween => tweening.splice(tweening.indexOf(tween), 1))

        ;[...Array(this.reelCount)].map((_,i) =>
		{
            let reel = this.objects['reel' + i]
            let { props } = reel
            props.blur.blurY = (props.pos - props.previousPos) * 8
			props.previousPos = props.pos
			
			;[...Array(this.symbolCount)].map((_,j) =>
			{
                let symbol = this.objects['symbol' + i + j]
				let prevy = symbol.y
				symbol.y = this.margin + (props.pos + j) % this.symbolCount * SYMBOL_SIZE - SYMBOL_SIZE
                if (symbol.y < 0 && prevy > SYMBOL_SIZE)
                {
                    symbol.texture = this.slotTextures[Math.floor(Math.random() * this.slotTextures.length)]
                    symbol.scale.set(symbol.texture.scale)
				}
			})
        })
    }

    ReelsComplete()
    {
		this.running = false
    }

    StartPlay()
    {
        if (this.running) return
        this.running = true
        
		;[...Array(this.reelCount)].map((_,i) =>
		{
            let reel = this.objects['reel' + i]
			let extra = Math.floor(Math.random() * 3)
            tweenTo(reel.props,
                'pos',
                reel.props.pos + 10 + i * 5 + extra,
                2500 + i * 600 + extra * 600,
                backout(0.6),
                null,
                i == this.reelCount - 1 ? _ => this.ReelsComplete() : null)
		})
    }

    componentReady()
    {
        return this.state.textures
    }

    componentDidMount()
    {
        ;[...Array(this.reelCount)].map((_,i) =>
		{
            let reel = this.objects['reel' + i]
            let { blur } = reel.props
            blur.blurX = blur.blurY = 0
            reel.filters = [blur]
		})
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        this.reelCount = 5
        this.symbolCount = 4
        this.margin = (screen.height - SYMBOL_SIZE * (this.symbolCount - 1)) / 2
        this.slotTextures =
        [
            this.loader.resources['eggHead'].texture,
            this.loader.resources['flowerTop'].texture,
            this.loader.resources['helmlok'].texture,
            this.loader.resources['skully'].texture,
        ]
        let style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        })
        this.running = false

        return (
            <Container>
                <Container position={[0, this.margin]}>
                {
                    [...Array(this.reelCount)].map((_,i) =>
                    {
                        return (
                            <Container object={'reel'+i} position={[i*REEL_WIDTH,0]} boxWidth={REEL_WIDTH} pos={0} previousPos={0} blur={new PIXI.filters.BlurFilter()}>
                            {
                                [...Array(this.symbolCount)].map((_,j) =>
                                {
                                    return <Sprite object={'symbol'+i+j} texture={this.slotTextures[Math.floor(Math.random() * this.slotTextures.length)]}
                                        position={[0, (j - 1) * SYMBOL_SIZE]}
                                        box={[REEL_WIDTH, SYMBOL_SIZE]}
                                    />
                                })
                            }
                            </Container>
                        )
                    })
                }
                </Container>
                <Container>
                    <Graphics>
                        <Graphics.Rect color={[0,1]} x={0} y={0} width={screen.width} height={this.margin}/>
                    </Graphics>
                    <Text text='PIXI MONSTER SLOTS!' style={style} box={[screen.width,this.margin]} />
                </Container>
                <Container onClick={evt => this.StartPlay(evt)} position={[0, SYMBOL_SIZE * (this.symbolCount - 1) + this.margin]}>
                    <Graphics>
                        <Graphics.Rect color={[0,1]} x={0} y={0} width={screen.width} height={this.margin}/>
                    </Graphics>
                    <Text text='Spin the wheels!' style={style} box={[screen.width,this.margin]} />
                </Container>
            </Container>
        )
    }
}
