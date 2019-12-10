const log  = m => v => {
  console.log(m,v)
  ; return v
}


const getNewImage = mdl =>
  m.request({method:'GET',url:mdl.imageUrl})
  .then( log('S'), log('E'))

const mdl = {
  imageUrl: null, imageSrc:null
}

const Toolbar = {
  showInput: false,
  view:({state, attrs:{mdl}}) => m('.toolbar', [
    !state.showInput && m('button', {onclick: e => state.showInput = true}, 'New Image'),
    state.showInput && [
      m('input', {onchange: e => mdl.imageUrl= e.target.value}),
      m('button', {onclick:e => {getNewImage(mdl); state.showInput = false}}, 'Get Image')
    ],
    m('button', {}, 'Restart')
  ])
}

const Puzzle = {
  view:({attrs:{mdl}}) => m('.puzzle', m('img', {src:mdl.imageSrc}))
}


const Game =  {
  view:() => m('.container', [
    m(Toolbar, {mdl}),
    m(Puzzle, {mdl})
  ])
}




document.addEventListener("DOMContentLoaded", () => {
  const root = document.body
  m.mount(root, Game)
})
