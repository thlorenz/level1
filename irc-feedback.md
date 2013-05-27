## how to index keywords


```
rvagg
yeah, so what you want to do is look up by keyword and you'll have multiple entries per keyword so they need to be
unique so append the package name after it cause that'll be unique

!index!keyword!level!package1
!index!keyword!level!package2
!index!keyword!db!package2
!index!keyword!store!package3

then, do a readstream starting at !index!keyword!level! and ending at !index!keyword!level!\xff and you'll get em all!
'!' perhaps not being the best choice, use \x00 or \xff probably
that's effectively what mapped-index automates for you
````

```
thl0
kinda like I have one collection just storing package names and another one keyed by package name that has actual package info?

rvagg
yeah, that's right
so the indexes are just redirections to the actual packages, the values should probably be the package name or whatever
the primary key is
```

```
rvagg
look in the code of level-mapped-index, it's quite short cause map-reduce does most of the work
just be conscious of potential overlaps
like 'level' vs 'leveldb', when you search for 'level' you shouldn't allow it to find 'leveldb'
```
