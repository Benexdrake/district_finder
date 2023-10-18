import { Street } from '@/street';
import STREETS from '@/streets.json'
import { useState } from 'react';

export default function Home() {
  let s = STREETS as Street[]
  const [streets, setStreets] = useState<Street[]>(s)

  let streetHandler = async (e: { target: { value: string; }; }) => {
    let s = await getStreetsByName(e.target.value);
    setStreets(s);
}

let openWebsiteHandler = (e:Street) =>
{
  window.open(`https://www.google.de/maps/place/${e.street},${e.postcode}+${e.city}`, '_blank')
}

  return (
    <div className="container" style={{paddingTop: '2rem'}}>
      <div className="form-outline">
                    <input type="search" id="form1" className="form-control" placeholder="Straßen Name" aria-label="Search" onChange={streetHandler} style={{marginBottom:'1rem'}}/>
                </div>
                <table className="table table-striped">
                            <thead>
                              <tr>
                                <th scope='col' style={{width:'10px', textAlign:'center'}}>Bezirk</th>
                                <th scope='col' style={{width:'200px', textAlign:'center'}}>Abschlepp</th>
                                <th scope='col' style={{textAlign:'center'}}>Straße</th>
                                <th scope='col' style={{textAlign:'center'}}>Ort</th>
                                <th scope='col' style={{textAlign:'center'}}>PLZ</th>
                              </tr>
                            </thead>
                            <tbody>

                    {streets.map(x => {
                      return (
                        <tr onClick={() => openWebsiteHandler(x)} >
                          <td style={{textAlign:'center'}}>{x.district}</td>
                          <td style={{textAlign:'center'}}>{x.towingCompany}</td>
                          <td style={{textAlign:'center'}}>{x.street}</td>
                          <td style={{textAlign:'center'}}>{x.location}</td>
                          <td style={{textAlign:'center'}}>{x.postcode}</td>
                        </tr>
                        )
                      })}
                      </tbody>
                          </table>
                
    </div>
  )
}

async function getStreetsByName(name:string)
{
  let streets = STREETS as Street[];
  return streets.filter(x => x.street.toLocaleLowerCase().includes(name.toLocaleLowerCase()))
         .sort((s1,s2) => (s1.district > s2.district) ? 1 : (s1 < s2) ? -1 : 0);
}
