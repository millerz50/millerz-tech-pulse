import { NextResponse } from "next/server";


export async function GET(){

  try {


    const sources = [

      {
        name:"TechCrunch",
        url:
        "https://techcrunch.com/feed/"
      },


      {
        name:"The Verge",
        url:
        "https://www.theverge.com/rss/index.xml"
      },


      {
        name:"Hacker News",
        url:
        "https://hnrss.org/frontpage"
      }

    ];



    const articles = [];


    for(const source of sources){


      const res =
      await fetch(source.url);


      const xml =
      await res.text();



      const items =
      [...xml.matchAll(/<item>(.*?)<\/item>/gs)];



      items.slice(0,5).forEach((item,index)=>{


        const content =
        item[1];


        const title =
        content.match(
          /<title>(.*?)<\/title>/
        )?.[1]
        ?.replace(
          /<!\[CDATA\[|\]\]>/g,
          ""
        )
        ||
        "Untitled";



        const link =
        content.match(
          /<link>(.*?)<\/link>/
        )?.[1]
        ||
        "";



        const description =
        content.match(
          /<description>(.*?)<\/description>/
        )?.[1]
        ?.replace(
          /<[^>]+>/g,
          ""
        )
        ||
        "";



        articles.push({

          id:
          `${source.name}-${index}`,

          title,

          summary:
          description.substring(0,200),


          fullContent:
          description,


          category:
          "software",


          source:{
            name:
            source.name,

            url:
            link
          },


          publishedAt:
          new Date()
          .toISOString(),


          readTime:
          "5 min read",


          imageUrl:
          "https://images.unsplash.com/photo-1518770660439-4636190af475",


          author:
          source.name,


          techTags:[
            "Technology",
            "AI",
            "Software"
          ],


          impactScore:
          Math.floor(
            Math.random()*30+70
          ),


          sentiment:
          "emerging"


        });


      });


    }



    return NextResponse.json({

      status:"success",

      articles

    });



  } catch(error){


    console.error(error);


    return NextResponse.json({

      status:"error",

      articles:[]

    });


  }


}