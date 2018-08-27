import { h } from 'preact'
import { Base, Container, Sprite } from 'preact-pixi'

export default class DemoTextureRotate extends Base
{
    constructor()
    {
        super()
        this.state = { textures: null }
        this.loader = new PIXI.loaders.Loader()
        this.loader
        .add('flowerTop', 'https://pixijs.io/examples/required/assets/flowerTop.png')
        .load( _ => this.setState({ textures: true }))
    }

    componentReady()
    {
        return this.state.textures
    }

    render()
    {
        const { screen } = this.props.root

        let texture = this.loader.resources['flowerTop'].texture
        let textures = [texture]
        let D8 = PIXI.GroupD8
        for (let rotate = 1; rotate < 16; rotate++)
        {
            let h = D8.isVertical(rotate) ? texture.frame.width : texture.frame.height
            let w = D8.isVertical(rotate) ? texture.frame.height : texture.frame.width
    
            let frame = texture.frame
            let crop = new PIXI.Rectangle(texture.frame.x, texture.frame.y, w, h)
            let trim = crop
            let rotatedTexture
            if (rotate % 2 == 0)
            {
                rotatedTexture = new PIXI.Texture(texture.baseTexture, frame, crop, trim, rotate)
            }
            else
            {
                rotatedTexture = new PIXI.Texture(texture.baseTexture, frame, crop, trim, rotate - 1)
                rotatedTexture.rotate++
            }
            textures.push(rotatedTexture)
        }
    
        let offsetX = screen.width / 16 | 0
        let offsetY = screen.height / 8 | 0
        let gridW = screen.width / 4 | 0
        let gridH = screen.height / 5 | 0

        return (
            <Container>
            {
                [...Array(16)].map((_, i) =>
                {
                    let texture = textures[i < 8 ? i * 2 : (i - 8) * 2 + 1]
                    let x = offsetX + gridW * (i % 4)
                    let y = offsetY + gridH * (i / 4 | 0)
                    return (
                        <Container>
                            <Sprite texture={texture}
                                position={[x, y]}
                                scale={[0.5]}
                            />
                            <Text text={`rotate = ${texture.rotate}`} position={[x, y - 20]}
                                style={{ fontFamily:'Courier New', fontSize:'12px', fill: 'white', align: 'left' }}
                            />
                        </Container>
                    )
                })
            }
            </Container>
        )
    }
}
