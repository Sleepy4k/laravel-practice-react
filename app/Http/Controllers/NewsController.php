<?php

namespace App\Http\Controllers;

use App\Models\News;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Http\Resources\NewsCollection;

class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $news = new NewsCollection(News::latest()->paginate(20));

        return Inertia::render('News/Index', [
            'title' => 'Laravel React SPA',
            'description' => 'Laravel React SPA with Inertia.js',
            'news' => $news
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = validator($request->all(), [
            'title' => ['required','string','max:255','unique:news,title'],
            'description' => ['required','string'],
            'category' => ['required','string','max:255']
        ]);
        
        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();
        $validated['author'] = auth()->user()->email;

        News::create($validated)->save();

        return back()->with('message', 'News created successfully!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function show(News $news)
    {
        $newsList = $news::where('author', auth()->user()->email)->get();

        return Inertia::render('Dashboard', [
            'newsList' => $newsList
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function edit(News $news)
    {
        return Inertia::render('News/Edit', [
            'newsData' => $news
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, News $news)
    {
        $validator = validator($request->all(), [
            'title' => ['required','string','max:255','unique:news,title,'.$news->id],
            'description' => ['required','string'],
            'category' => ['required','string','max:255']
        ]);
        
        if ($validator->fails()) {
            dd($validator->errors());
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validated();
        $validated['author'] = auth()->user()->email;

        News::find($news->id)->update($validated);

        return to_route('dashboard')->with('message', 'News updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy(News $news)
    {
        News::find($news->id)->delete();

        return back()->with('message', 'News deleted successfully!');
    }
}
