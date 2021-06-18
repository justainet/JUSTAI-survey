import { createClient } from '@supabase/supabase-js'
import { dendro } from './dendro.js'
import { wheel } from './wheels.js'
import {
  getSelfEthicist,
  getOthersEthicist,
  getFunding,
  getYearsInField,
  getEducation,
  getCareer,
  getTopics,
  getDomain,
  getOutput,
  getAudience,
  getCollabType,
  getCollabField,
} from './reshape-data.js'

const SUPABASE_URL = 'https://qqvziidjcugzwycwavta.supabase.co'
const SUPABASE_PUBLIC_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMzY2NTk5NSwiZXhwIjoxOTM5MjQxOTk1fQ.L4M9hdUoYh3gPHKH0P4-QErYOBOL8R2eggSeNBAHTTY'

const api = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY)
let INITGRAPH = true

// check for email / id
const urlparams = new URLSearchParams(document.location.search.substring(1))

const getEmail = () => {
  const emailURI = urlparams.get('email')
  if (emailURI && emailURI !== 'undefined' && emailURI !== 'null')
    return decodeURIComponent(emailURI)
  else return false
}

const getID = () => {
  const idURI = urlparams.get('id')
  if (idURI && idURI !== 'undefined' && idURI !== 'null')
    return decodeURIComponent(idURI)
  else return false
}

const email = getEmail()
const id = getID()

if (!(email || id)) {
  INITGRAPH = false
}

const init = async () => {
  // get latest count
  const { error, count } = await api
    .from('count_without_q3_no')
    .select('id', { count: 'exact' })

  // subscribe on latest survey answers

  const subHandler = (payload) => {
    const docErrs = document.getElementsByClassName('error-msg')
    for (const doc of docErrs) {
      doc.hidden = true
    }
    triggerGeneratingJson(payload.new)
      .then((data) => {
        dendro(data, INITGRAPH)
        return data
      })
      .then((data) => {
        wheel(data, INITGRAPH)
        if (!INITGRAPH) INITGRAPH = false
        return data
      })
      .catch(console.error) // with latest data object
  }
  const subscription =
    email || id
      ? email
        ? api
            .from(`data:email=eq.${email}`)
            .on('INSERT', subHandler)
            .subscribe()
        : api
            .from(`data:response_id=eq.${id}`)
            .on('INSERT', subHandler)
            .subscribe()
      : api.from('data').on('INSERT', subHandler).subscribe()

  // get pre-generated json
  // if we have email or id return nothing, so we force download from API
  const oldData =
    email || id
      ? false
      : await fetch('./data/data.json')
          .then((it) => it.json())
          .catch((it) => false)

  if (!oldData || oldData.children[2].responses !== count) {
    if (!oldData && !(email || id)) {
      INITGRAPH = true // in case we don't have oldData and we are waiting on root,
      // so websoket can initialize
      // the next one will crash anyway
    }
    const dataP =
      email || id // check if we need to narrow down to email/id
        ? email
          ? api.from('data').select().eq('email', email).limit(1).single()
          : api.from('data').select().eq('response_id', id).limit(1).single()
        : api
            .from('data')
            .select()
            .order('created_time', { ascending: false })
            .limit(1)
            .single() // pull the most receant

    const { data: data, error: err } = await dataP
    if (err) {
      if (
        err.message === 'JSON object requested, multiple (or no) rows returned'
      ) {
        // show pretty that we did not find user yet, but viz will appear when we receive response
        // it could be alse that we cannot find email nor id
        const docErrs = document.getElementsByClassName('error-msg')
        for (const doc of docErrs) {
          doc.innerHTML = `<div class="row error-msg-content">
                            <p class="col-12" >We’re receiving your survey data from the survey provider.</br>Please wait.</p>
                            <i class="col-12 spin bi bi-arrow-repeat"></i>
                            <p class="col-12" >It might take a minute.</br>You can use the mean time to get familiar with the project</p>
                           </div>`
        }
      }
      console.error(err)
      return
    }
    triggerGeneratingJson(data)
      .then((data) => {
        dendro(data, INITGRAPH)
        return data
      })
      .then((data) => {
        wheel(data, INITGRAPH)
        INITGRAPH = false
        return data
      })

      .catch(console.error) // initial trigger
  }

  // remove subscription if user is about to close the window
  window.addEventListener('beforeunload', function (event) {
    api.removeSubscription(subscription)
    return event
  })
}

const triggerGeneratingJson = async (data, cnt) => {
  const q70P = api.from('group_by_70').select()
  const q71P = api.from('group_by_71').select()
  const q65P = api.from('group_by_65').select()
  const q14P = api.from('group_by_14').select()
  const q7P = api.from('group_by_7').select()
  const q9P = api.from('group_by_9').select()

  const q30q133q149P = api.from('group_by_30_133_149').select()
  const q33q139q155P = api.from('group_by_33_139_155').select()
  const q37q143q159P = api.from('group_by_37_143_159').select()
  const q51q144q160P = api.from('group_by_51_144_160').select()
  const q35q141q157P = api.from('group_by_35_141_157').select()
  const q36q142q158P = api.from('group_by_36_142_158').select()

  // await the promises
  // data :: Object
  let count = cnt
  if (!count) {
    const { error: err1, count: countNew } = await api
      .from('count_without_q3_no')
      .select('id', { count: 'exact' })
    if (err1) {
      console.error('API-ERROR:\n', err1)
      return
    }
    count = countNew
  }
  const { data: q70, error: err2 } = await q70P
  const { data: q71, error: err3 } = await q71P
  const { data: q65, error: err4 } = await q65P
  const { data: q14, error: err5 } = await q14P
  const { data: q7, error: err6 } = await q7P
  const { data: q9, error: err7 } = await q9P

  const { data: q30_q133_q149, error: err8 } = await q30q133q149P
  const { data: q33_q139_q155, error: err9 } = await q33q139q155P
  const { data: q37_q143_q159, error: err10 } = await q37q143q159P
  const { data: q51_q144_q160, error: err11 } = await q51q144q160P
  const { data: q35_q141_q157, error: err12 } = await q35q141q157P
  const { data: q36_q142_q158, error: err13 } = await q36q142q158P

  const error =
    err2 ||
    err3 ||
    err4 ||
    err5 ||
    err6 ||
    err7 ||
    err8 ||
    err9 ||
    err10 ||
    err11 ||
    err12 ||
    err13

  if (error) {
    console.error('API-ERROR:\n', error)
    return
  }

  // identity
  const selfEthicist = getSelfEthicist(data, q70) //::Array
  const othersEthicist = getOthersEthicist(data, q71) //::Array
  const funding = getFunding(data, q14) //::Array
  const yearsInField = getYearsInField(data, q7) //::Array
  const education = getEducation(data, q9) //::Array
  const career = getCareer(data, q65) //::Array

  // theme
  const topic = getTopics(data, q30_q133_q149) //::Array
  const domain = getDomain(data, q33_q139_q155) //::Array
  const output = getOutput(data, q37_q143_q159) //::Array
  const audience = getAudience(data, q51_q144_q160) //::Array
  const collabtype = getCollabType(data, q35_q141_q157) //::Array
  const collabfield = getCollabField(data, q36_q142_q158) //::Array

  return {
    name: '',
    children: [
      {
        name: 'identity',
        children: [
          { name: 'self-ethicist', children: selfEthicist },
          { name: 'others-ethicist', children: othersEthicist },
          { name: 'paid work', children: funding },
          { name: 'years in field', children: yearsInField },
          { name: 'education', children: education },
          { name: 'career path', children: career },
        ],
      },
      {
        name: 'theme',
        children: [
          { name: 'topics', children: topic },
          { name: 'domain', children: domain },
          { name: 'outputs', children: output },
          { name: 'audiences', children: audience },
          { name: 'collab type', children: collabtype },
          { name: 'collab field', children: collabfield },
        ],
      },
      { responses: count },
    ],
  }
}

if (!(email || id)) {
  document.getElementById(
    'text-intro-1sec'
  ).innerText = `Using the information shared, we have created visual representations of research interests and perspectives in the field of AI and data ethics.`
  document.getElementById(
    'text-2section-your'
  ).innerText = `Here is a different visualization of the latest response among all of the responses to the survey thus far. Rather than viewing these visualizations as static networks showing links between nodes, let’s interpret the response as part of a social process that defines the research we conduct in the field of data and AI ethics. By sharing perspectives, one position in this network will change in relation to other perspectives.`
  document.getElementById('text-your-headline').innerText = 'Latest'
  const docYours = document.getElementsByClassName('text-your')
  for (const el of docYours) {
    el.innerText = 'the latest'
  }

  const docHideShowEl = document.getElementsByClassName('text-hide-section')
  for (const el of docHideShowEl) {
    el.innerText = 'the most recent response.'
  }

  const docDelete = document.getElementsByClassName('text-delete')
  for (const el of docDelete) {
    el.innerText = ''
  }
  //
}

init().catch(console.error)

if (window.innerWidth < 768) {
  $('#sizeModal').modal('toggle')
}
