<article>
	<h2>#{title}</h2>
	<p>#{date}</p>

	<div>
		#{body}
	</div>

	<ol>
		#{render blog/posts/comments foreach comments}
	</ol>
</article>
