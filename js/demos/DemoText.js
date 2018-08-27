import { h, render, Component } from 'preact'
import { Base, Container, Sprite, Text, BitmapText } from 'preact-pixi'

export default class DemoText extends Base
{
    constructor()
    {
        super()
        this.state =
        {
            webfont: false,
            bitmapfont: false,
        }

        window.WebFontConfig =
        {
            google: { families: ['Snippet', 'Arvo:700italic', 'Podkova:700'] },
            active: _ => this.setState({ webfont: true }),
        }
        ;(function()
        {
            var wf = document.createElement('script')
            wf.src = ('https:' === document.location.protocol ? 'https' : 'http') + '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'
            wf.type = 'text/javascript'
            wf.async = 'true'
            var s = document.getElementsByTagName('script')[0]
            s.parentNode.insertBefore(wf, s)
        })()

        PIXI.loader
        .add('desyrel', 'https://pixijs.io/examples/required/assets/desyrel.xml')
        .load(_ => this.setState({ bitmapfont: true }))
    }

    Update(deltaTime)
    {
        const { spinningText, countingText } = this.objects
        this.count += 0.05
        countingText.text = 'COUNT 4EVAR: ' + Math.floor(this.count)
        spinningText.rotation += 0.03
    }

    componentReady()
    {
        return this.state.webfont && this.state.bitmapfont
    }

    componentDidMount()
    {
        const { screen } = this.props.root
        const { bitmapFontText } = this.objects
        bitmapFontText.x = screen.width - bitmapFontText.textWidth - 20
        this.BindUpdate()
    }

    render()
    {
        const { screen } = this.props.root
        this.count = 0
        return (
            <Container>
                <Sprite texture={PIXI.Texture.fromImage('https://pixijs.io/examples/required/assets/textDemoBG.jpg')}
                    width={1} height={1}
                />
                <Text position={[20]}
                    text={'Pixi.js can has\n multiline text!'}
                    style={{
                        fontFamily: 'Snippet',
                        fontSize: 35,
                        fill: 'white',
                        align: 'left',
                    }}
                />
                <BitmapText object='bitmapFontText'
                    position={[0, 20]}
                    text={'bitmap fonts are\n now supported!'}
                    style={{ font: '35px Desyrel', align: 'right' }}
                />
                <Text object='spinningText'
                    position={[screen.width / 2, screen.height / 2]}
                    anchor={[0.5]}
                    text={'I\'m fun!'}
                    style={{
                        fontWeight: 'bold',
                        fontSize: 60,
                        fontFamily: 'Arial',
                        fill: '#cc00ff',
                        align: 'center',
                        stroke: '#FFFFFF',
                        strokeThickness: 6,
                    }}
                />
                <Text object='countingText'
                    position={[screen.width / 2, 500]}
                    anchor={[0.5, 0]}
                    text='COUNT 4EVAR: 0'
                    style={{
                        fontWeight: 'bold',
                        fontStyle: 'italic',
                        fontSize: 60,
                        fontFamily: 'Arvo',
                        fill: '#3e1707',
                        align: 'center',
                        stroke: '#a4410e',
                        strokeThickness: 7,
                    }}
                />
            </Container>
        )
    }
}
